import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import {
  IIdentityProvider,
  Organization,
  IOrganizationFactory,
  IRoleFactory,
  Role,
  ICookieService,
  INotificationService,
  IIdentityFactory, PERPENDICULAR_HTTP,
} from 'perpendicular-core';
import { Identity } from 'perpendicular-core';
import {
  GUEST_LOGIN_MARKETING_CONSENT,
  MARKETING_CONSENT_COOKIE_PREFIX,
  ProvidersWCSConfig
} from 'perpendicular-core';
import { map, tap } from 'rxjs/operators';

/**
 * A WebSphere Commerce specific identity provider.
 *
 * As this can be referenced indirectly through the identity service from other providers, it cannot use the
 * normal rest driver.
 */
@Injectable({
  providedIn: 'root'
})
export class WCSIdentityProvider extends IIdentityProvider {
  /**
   * Base path for the logonIdentity resource
   */
  protected logonIdentityBasepath: string;
  /**
   * Base path for the guestIdentity resource
   */
  protected guestIdentityBasepath: string;

  /**
   * Base path for the person resource
   */
  protected personBasepath: string;

  /**
   * Base path for the preview resource
   */
  protected previewBasepath: string;

  /**
   * Base path for identity context information
   */
  protected contextPath: string;

  constructor(
    @Inject(PERPENDICULAR_HTTP) protected http: HttpClient,
    protected config: ProvidersWCSConfig,
    @Optional() protected orgFactory: IOrganizationFactory,
    @Optional() protected roleFactory: IRoleFactory,
    protected cookieService: ICookieService,
    protected notificationService: INotificationService,
    protected identityFactory: IIdentityFactory,
    @Inject(GUEST_LOGIN_MARKETING_CONSENT) protected guestLoginDefaultConsent: boolean,
    @Inject(MARKETING_CONSENT_COOKIE_PREFIX) protected marketingConsentCookiePrefix: string,
  ) {
    super();
    this.logonIdentityBasepath = config.getWcsEndpointUrl('loginidentity');
    this.guestIdentityBasepath = config.getWcsEndpointUrl('guestidentity');
    this.personBasepath = config.getWcsEndpointUrl('person');
    this.previewBasepath = config.getWcsEndpointUrl('previewToken');
    this.contextPath = config.getWcsEndpointUrl('usercontext');
  }

  /**
   * Log user in, based on credentials. We use the abstract driver to forward current session information to
   * server to facilitate merging / migrating of any modified cart assets and previous address book information.
   */
  public login(userName: string, password: string, identity: Identity): Promise<Identity> {
    // wait for pending requests to complete, before establishing a new context on the backend.
    return this.notificationService.stable.then(y => {
      const url = this.getLoginUrl();
      const payload = this.getLoginPayload(userName, password);
      const headers = this.getIdentityHeaders(identity);

      return this.http.post(url, payload, { headers }).pipe(
        map(x => (this.convertToIdentity()(x)))
      ).toPromise();
    });
  }

  /**
   * Clear session, and reverts to anonymous user ( not guest )
   */
  public logout(identity: Identity): Promise<void> {
    // wait for pending requests to complete, before establishing a new context on the backend.
    return this.notificationService.stable.then(y => {
      const url = this.getLogoutUrl();
      const params = new HttpParams();
      const headers = this.getIdentityHeaders(identity);

      return this.http.delete(url, { params, headers }).pipe(
        map(x => {})
      ).toPromise();
    });
  }
  /**
   * Set up a guest shopper context. This should be the default starting state for new sessions.
   */
  public guestLogin(): Promise<Identity> {
    const url = this.getGuestLoginUrl();
    const payload = this.getGuestLoginPayload();
    const headers = this.getIdentityHeaders(null);

    // wait for pending requests to complete, before establishing a new context on the backend.

    return this.notificationService.stable.then(y => {
      return this.http.post(url, payload, { headers }).pipe(
        map(x => (this.convertToIdentity())(x)),
        tap(x => (this.updateConsentCookie(this.guestLoginDefaultConsent, x)))
      ).toPromise();
    });
  }

  /**
   * Returns roles associated with current user.
   */
  public getRoles(identity: Identity): Promise<Role[]> {
    const url = this.getRoleUrl(identity.userId || '');
    const params = this.getRolePayload();
    const headers = this.getIdentityHeaders(identity);

    return this.http.get(url, { params, headers }).pipe(
        map(x => (this.convertToRoles(identity.activeOrganizationId || '')(x)))
      ).toPromise();
  }

  /**
   * Returns the full context about the currently authenticated identity.
   * @param identity the identity for which to fetch the context for
   */
  public getIdentityContext(identity: Identity): Promise<Identity> {
    const url = this.getContextUrl();
    const params = new HttpParams();
    const headers = this.getIdentityHeaders(identity);

    return this.http.get(url, { params, headers }).pipe(map( x => (this.convertToIdentityWithContext(identity)(x)))).toPromise();
  }

  /**
   * Upgrade current guest account to a registered account, by adding a username and password to it. The backend should ensure that
   * all content associated with the current guest user, is now associated with the new Registered User.
   */
  public register(username: string, password: string, identity: Identity): Promise<Identity> {
    const url = this.getRegistrationUrl();
    const payload = this.getRegisterUserPayload(username, password);
    const headers = this.getIdentityHeaders(identity);

    return this.http.post(url, payload, { headers }).pipe(
      map(x => this.convertToIdentity()(x))
    ).toPromise();
  }

  /**
   * Changes password on current account (must be registered customer)
   */
  public changePassword(oldPassword: string, newPassword: string, identity: Identity): Promise<void> {
    const url = this.getUpdateRegistrationUrl();
    const payload = this.getChangePasswordPayload(oldPassword, newPassword);
    const headers = this.getIdentityHeaders(identity);

    return this.http.put(url, payload, { headers }).pipe(
      map(x => {})
    ).toPromise();
  }

  /**
   * Informs backend to initiate a reset password process. This might involve the user getting a verification token by email, or
   * SMS, or just simply the backend issuing a new password.
   *
   * *NOTE* it is the ProfileService that is responsible for having set a valid email or phone number on the account.
   * *NOTE* Default WCS implementation uses an activation code, sent to the user.
   * @param identity a guest identity that user is currently using, to which a token can be issued.
   * @return a promise, optionally containing a security question to ask the user.
   */
  public initiateResetPassword(userIdentification: string, identity: Identity): Promise<string> {
    const url = this.getInitiateResetPasswordURL();
    const payload = this.getInitiateResetPasswordPayload(userIdentification);
    const headers = this.getIdentityHeaders(identity);

    return this.http.put(url, payload, { headers }).pipe(
      map(x => '')
    ).toPromise();
  }

  /**
   * performs the actual password reset.
   *
   * @param userIdentification the logonId
   * @param oldPassword the existing password, in case of expired password changes
   * @param newPassword the password to set
   * @param verificationText either the answer to a security question, or a verification token sent via SMS or Email,
   *        depending on backend capability.
   */
  public resetPassword(
    userIdentification: string,
    oldPassword: string,
    newPassword: string,
    verificationText: string,
    identity: Identity,
  ): Promise<void> {
    const url = this.getResetPasswordURL();
    const payload = this.getResetPasswordPayload(userIdentification, oldPassword, newPassword, verificationText);
    const headers = this.getIdentityHeaders(identity);

    return this.http.put(url, payload, { headers }).pipe(
      map(x => {})
    ).toPromise();
  }
  /**
   * Returns organizations for which this user is allowed to trade
   * @param identity the identity for which to fetch roles
   */
  public getOrganizations(identity: Identity): Promise<Organization[]> {
    const url = this.getOrganizationsURL();
    const params = this.getOrganizationsParams(identity);
    const headers = this.getIdentityHeaders(identity);

    return this.http.get(url,  { params, headers }).pipe(
      map(x => (this.convertToOrganizations()(x)))
    ).toPromise();
  }

  /**
   * Sets the active organization for which the user is trading
   * @param identity the identity for which to fetch roles
   */
  public setActiveOrganization(identity: Identity, organizationId: string): Promise<void> {
    // we have to wait for all pending requests to be complete before updating the context, as otherwise
    // we risk having the context not be updated.
    return this.notificationService.stable.then(y => {
      const url = this.getActiveOrganizationURL(organizationId);
      const payload = this.getActiveOrganizationPayload(organizationId);
      const headers = this.getIdentityHeaders(identity);

      return this.http.put(url, payload, { headers }).pipe(
        map(x => {})
      ).toPromise();
    });
  }

  // for admins
  /**
   * Set this session in preview mode, to allow viewing marketing content in the future, and get
   * Information on how marketing spots are evaluated
   */
  public setupPreviewContext(additionalMemberGroups: string[], startDate: Date, identity: Identity): Promise<string> {
    const url: string = this.getPreviewTokenUrl();
    const payload: any = this.getPreviewTokenPayload(additionalMemberGroups, startDate);
    const headers = this.getIdentityHeaders(identity);

    return this.http.post(url, payload, { headers }).pipe(
      map(x => (this.convertPreviewToken(x)))
    ).toPromise();
  }

  /**
   * Helper function
   */
  protected getOrganizationsURL(): string {
    return this.config.getWcsEndpointUrl('organization') + '/@self/entitled_orgs';
  }

  /**
   * Helper function
   */
  protected getOrganizationsParams(identity: Identity): HttpParams {
    let h = new HttpParams();
    h = h.append('responseFormat', 'json');
    return h;
  }

  /**
   * Helper function
   */
  protected getActiveOrganizationURL(organizationId: string): string {
    return this.config.getWcsEndpointUrl('switchOrganization') + '/switchTo?URL=NoURL&activeOrgId=' + organizationId;
  }
  /**
   * Helper function
   */
  protected getActiveOrganizationPayload(organizationId: string): any {
    return {};
  }

  /**
   * Helper function
   */
  protected getInitiateResetPasswordURL(): string {
    return this.personBasepath + '/@self';
  }
  /**
   * Helper function
   */
  protected getResetPasswordURL(): string {
    return this.personBasepath + '/@self';
  }

  /**
   * Helper function
   */
  protected getResetPasswordPayload(userIdentification: string,
                                    oldPassword: string,
                                    newPassword: string,
                                    verificationText: string): any {
    let body: object = {
      logonId: '' + userIdentification,
      resetPassword: 'true',
      logonPassword: '' + newPassword,
      xcred_logonPasswordVerify: '' + newPassword,
      challengeAnswer: '-',
    };

    if (oldPassword) {
      body = Object.assign({}, body, { xcred_logonPasswordOld: oldPassword});
    }
    if (verificationText) {
      body = Object.assign({}, body, { xcred_validationCode: oldPassword});
    }

    return body;
  }

  /**
   * Helper Function
   */
  protected getChangePasswordPayload(oldPassword: string, newPassword: string): any {
    const body: any = {
      resetPassword: 'true',
      xcred_logonPasswordOld: '' + oldPassword,
      logonPassword: '' + newPassword,
      xcred_logonPasswordVerify: '' + newPassword,
    };

    return body;
  }

  /**
   * Helper function
   */
  protected getInitiateResetPasswordPayload(userIdentification: string): any {
    const body: any = {
      logonId: '' + userIdentification,
      resetPassword: 'true',
      challengeAnswer: '-',
    };

    return body;
  }
  /**
   * Return the url to when establishing a registered user session.
   */
  protected getLoginUrl(): string {
    return this.logonIdentityBasepath;
  }

  /**
   * Helper to calculate payload
   */
  protected getLoginPayload(userName: string, password: string): any {
    const body: any = {
      logonId: '' + userName,
      logonPassword: '' + password,
    };

    return body;
  }

  /**
   * Helper to calculate payload
   */
  protected getRegisterUserPayload(userName: string, password: string): any {
    const body: any = {
      logonId: '' + userName,
      logonPassword: '' + password,
      challengeQuestion: '-',
      challengeAnswer: '-',

      // add some empty fields to force creation of USERDEMO and USERPROF
      gender: 'N',
      description: '-',
    };
    return body;
  }
  /**
   * Return the url to when establishing a guest session
   */
  protected getGuestLoginUrl(): string {
    return this.guestIdentityBasepath;
  }

  /**
   * Return payload to use for guest logins
   */
  protected getGuestLoginPayload(): any {
    const body: any = {
      marketingTrackingConsent: this.guestLoginDefaultConsent ? '1' : '0'
    };

    return body;
  }

  /**
   * Return the url to when establishing a guest session
   */
  protected getContextUrl(): string {
    return this.contextPath + '/@self/contextdata';
  }

  /**
   * Return the url to call when logging out
   */
  protected getLogoutUrl(): string {
    return this.logonIdentityBasepath + '/@self';
  }

  /**
   * Return the url to call when converting a guest user to a registered user
   */
  protected getRegistrationUrl(): string {
    return this.personBasepath + '?mode=self';
  }

  protected getUpdateRegistrationUrl(): string {
    return this.personBasepath + '/@self';
  }

  /**
   * Return the url to call when setting up a preview context
   */
  protected getPreviewTokenUrl(): string {
    return this.previewBasepath;
  }

  /**
   * Helper function to calculate payload for preview call
   */
  protected getPreviewTokenPayload(additionalMemberGroups: string[], startDate: Date): any {
    let body: any = {};

    if (!!startDate) {
      const start =
        startDate.getFullYear() +
        '/' +
        startDate.getMonth() +
        '/' +
        startDate.getDate() +
        ' ' +
        startDate.getHours() +
        ':' +
        startDate.getMinutes() +
        ':' +
        startDate.getSeconds();

      body = Object.assign({}, body, { start });
    }

    if (!!additionalMemberGroups) {
      body = Object.assign({}, body,  { memberGroupIds: additionalMemberGroups.join(',') });
    }

    return body;
  }
  /**
   * Return the url to call when getting the roles of a user
   */
  protected getRoleUrl(userId: string): string {
    const url = this.personBasepath + '/' + userId;

    return url;
  }

  /**
   * Returns the payload for the call to get user roles
   */
  protected getRolePayload(): HttpParams {
    let params: HttpParams = new HttpParams();
    params = params.set('profileName', 'IBM_Roles_Of_User_All');

    return params;
  }

  /**
   * Converts the backend json object to an Identity object.
   */
  protected convertToIdentity(): (res: any) => Identity {
    return res => {
      let result = this.identityFactory.newInstance();
      if (!!res) {
        result = this.identityFactory.newInstanceFromJSON(res);
      }
      return result;
    };
  }



  /**
   * Converts the backend json object to an Identity object with extended context information
   */
  protected convertToIdentityWithContext(identity: Identity): (res: any) => Identity {
    return res => {
      // we create a new object, hopefully with all the old values intact, to avoid
      // changing the original object
      const returnValue = this.identityFactory.newInstanceFromIdentity(identity);
      if (res) {
        if (res && res.isLoggedIn) {
          returnValue.isLoggedIn = res.registerType === 'R' || res.registerType === 'A' || res.registerType === 'S';
        }
        if (res.basicInfo) {
          returnValue.isLoggedIn = returnValue.isLoggedIn ||
            res.basicInfo.registerType === 'R' ||
            res.basicInfo.registerType === 'A' ||
            res.basicInfo.registerType === 'S';

          returnValue.userId = '' + res.basicInfo.callerId;
        }
        if (res.activityToken) {
          returnValue.sessionId = res.activityToken.activityId;
        } else {
          returnValue.sessionId = '';
        }
        // Read the entitlement information. We first see if we have our own overrides, and if not
        // (in case IBM fixes it at some point), we fall back to the default.
        if (res.entitlement) {
          if (res.entitlement.currentTradingAgreementIds_str) {
            returnValue.activeContractId = res.entitlement.currentTradingAgreementIds_str[0];
          } else {
            // this usually wont work, because the large IDs get truncted when the result is
            // parsed as json.
            returnValue.activeContractId = res.entitlement.currentTradingAgreementIds[0];
          }
          if (res.entitlement.activeOrganizationId_str) {
            returnValue.activeOrganizationId = String(res.entitlement.activeOrganizationId_str);
          } else {
            returnValue.activeOrganizationId = String(res.entitlement.activeOrganizationId);
          }

          if (res.entitlement.eligibleTradingAgreementIds_str) {
            returnValue.allowedContracts = res.entitlement.eligibleTradingAgreementIds_str;
          } else {
            returnValue.allowedContracts = res.entitlement.eligibleTradingAgreementIds;
          }
        }
      }

      return returnValue;
    };
  }

  /**
   * Helper function to convert json response to roles query
   */
  protected convertToRoles(activeOrganizationId: string): (res: any) => Role[] {
    return res => {
      const result: Role[] = [];

      if (!res || !res.orgIdRoleDataBeans) {
        return result;
      }
      const rolesForOrg = res.orgIdRoleDataBeans[activeOrganizationId];

      if (rolesForOrg) {
        for (const roleIdx in rolesForOrg) {
          if (!rolesForOrg.hasOwnProperty(roleIdx)) {
            continue;
          }
          const role = rolesForOrg[roleIdx];
          const roleModel = this.roleFactory.newInstanceFromJSON(role);
          result.push(roleModel);
        }
      }

      return result;
    };
  }

  /**
   * Helper function
   */
  protected convertToOrganizations(): (res: any) => Organization[] {
    return res => {
      const result = new Array<Organization>();
      if (res && res.entitledOrganizations) {
        for (const entitledOrg of res.entitledOrganizations) {
          const org = this.orgFactory.newInstance();
          if (entitledOrg.organizationId_str) {
            org.id = entitledOrg.organizationId_str;
          } else {
            org.id = entitledOrg.organizationId;
          }
          org.displayName = entitledOrg.displayName;
          org.name = entitledOrg.displayName;
          result.push(org);
        }
      }
      return result;
    };
  }
  /**
   * Helper function
   */
  protected convertPreviewToken(res: any): string {
    if (res && res.previewToken) {
      return res.previewToken;
    }

    return '';
  }

  /**
   * Calculates a unique cookie name for the store and user
   */
  protected getCookieName(baseName: string, identity: Identity): string {
    return `${baseName}_${this.config.storeId}_${identity.userId}`;
  }

  /**
   * For guest users, we have to store the setting locally, in order to be
   * able to read it back if we need to. For registered customers we dont store a cookie.
   */
  protected updateConsentCookie(consent: boolean, identity: Identity): void {
    this.cookieService.setWithUniquePrefix(
      this.marketingConsentCookiePrefix + '_',
      this.getCookieName(this.marketingConsentCookiePrefix, identity),
      consent ? '1' : '0',
      false,
    );
    this.cookieService.setWithUniquePrefix(
      this.marketingConsentCookiePrefix + 'TimeStamp_',
      this.getCookieName(this.marketingConsentCookiePrefix + 'TimeStamp', identity),
      new Date().toUTCString(),
      false,
    );
  }

  /**
   * Helper method to prefill headers of outgoing calls with identity tokens, accept types etc.
   */
  protected getIdentityHeaders(identity: Identity | null): HttpHeaders {
    let h: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Explicit-Authentication': 'true'
    });
    if (!!identity) {
      if (identity.wcToken) {
        h = h.append('WCToken', identity.wcToken);
      }
      if (identity.wcTrustedToken) {
        h = h.append('WCTrustedToken', identity.wcTrustedToken);
      }
      if (identity.inPreviewMode && identity.previewToken) {
        h = h.append('WCPreviewToken', identity.previewToken);
      }
    }
    return h;
  }
}
