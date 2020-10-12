import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Inject, Optional } from '@angular/core';
import {
  IProfileProvider,
  IProfileFactory,
  IIdentityService,
  ICookieService,
  Profile,
  Address,
  Identity,
  ProvidersWCSConfig,
  MARKETING_CONSENT_COOKIE_PREFIX,
  PRIVACY_POLICY_COOKIE_PREFIX, PERPENDICULAR_HTTP, IIdentityFactory
} from 'perpendicular-core';
import {
  WCSProfile
} from 'perpendicular-models-wcs';
import { map } from 'rxjs/operators';

/**
 * A WebSphere Commerce specific implementation of [[IPersonProvider]]
 */
@Injectable()
export class WCSProfileProvider extends IProfileProvider {
  /**
   * Base path for the resource
   */
  protected basepath: string;

  /**
   * The identity for which this profile corrosponds
   */
  protected identity: Identity;

  /**
   * Default Constructor
   */
  constructor(
    @Inject(PERPENDICULAR_HTTP) public http: HttpClient,
    public profileFactory: IProfileFactory,
    public identityFactory: IIdentityFactory,
    public identityService: IIdentityService,
    public config: ProvidersWCSConfig,
    public cookieService: ICookieService,
    @Inject(MARKETING_CONSENT_COOKIE_PREFIX) protected marketingConsentCookiePrefix: string,
    @Inject(PRIVACY_POLICY_COOKIE_PREFIX) protected privacyPolicyVersionCookiePrefix: string,
  ) {
    super();

    this.basepath = config.getWcsEndpointUrl('person');

    this.identity = this.identityFactory.newInstance();
    this.identityService.state.subscribe(x => {
      this.identity = x;
    });
  }

  /**
   * Returns the profile data for the currently established [[Identity]]
   */
  public getSelf(): Promise<Profile> {
    const url: string = this.getSelfUrl();
    const params: HttpParams = this.getSelfParams();

    return this.http.get(url, { params }).pipe(
      map(x => this.convertToProfile()(x))
    ).toPromise();
  }

  public updateProfile(profile: Profile): Promise<Profile> {
    const url: string = this.getSelfUrl();
    const payload: string = this.getUpdateProfileInfoPayload(profile as WCSProfile);

    return this.http.put(url, payload).pipe(
      map(x => null as unknown as WCSProfile)
    ).toPromise();
  }

  /**
   * Adds a new address to the customers address book. Can be used by both Guest and Registered Customers
   */
  public addAddressToAddressBook(address: Address): Promise<void> {
    const url: string = this.getAddAddressBookURL();
    const body: string = this.getAddressBookAddressPayload(address);

    return this.http.post(url, body).pipe(
      map(x => null as unknown as void)
    ).toPromise();
  }

  /**
   * Updates an existing address in the address book. Can be used by both Guest and Registered Customers
   */
  public updateAddressInAddressBook(address: Address): Promise<void> {
    const url: string = this.getUpdateRemoveAddressBookURL(address.nickName || '');
    const body: string = this.getAddressBookAddressPayload(address);

    return this.http.put(url, body).pipe(
      map(x => null as unknown as void)
    ).toPromise();
  }

  /**
   * Deletes an address from the customers address book
   */
  public deleteAddressFromAddressBook(address: Address): Promise<void> {
    const url: string = this.getUpdateRemoveAddressBookURL(address.nickName || '');

    return this.http.delete(url, {}).pipe(
      map(x => null as unknown as void)
    ).toPromise();
  }

  /**
   * Retrieves a given customers profile based on the customers unique identifier
   */
  public getProfileById(id: string): Promise<Profile> {
    const url = this.getProfileByIdURL(id);
    const params = this.getProfileByIdParams(id);

    return this.http.get(url, { params }).pipe(
      map(x => this.convertToProfile()(x))
    ).toPromise();
  }

  /**
   * GDPR: Records the change in online marketing consent.
   * Setting to false, might also clear the backend of previously stored
   * marketing related tracking data. However, this is backend specific.
   */
  public changeMarketingConsent(consent: boolean): Promise<void> {
    const url: string = this.getChangeMarketingConsentURL(consent);
    const payload: any = this.getChangeMarketingConsentPayload(consent);

    return this.http.post(url, payload).pipe(
      map(x => null as unknown as void)
    ).toPromise().then(x => {
      if (!this.identity.isLoggedIn) {
        return this.updateConsentCookie(consent);
      } else {
        return Promise.resolve(x);
      }
    });
  }

  /**
   * GDPR: Records the users acceptance of a new privacy policy version
   */
  public updatePrivacyPolicyAcceptance(version: string): Promise<void> {
    const url: string = this.getUpdatePrivacyPolicyAcceptanceURL(version);
    const payload: any = this.getUpdatePrivacyPolicyAcceptancePayload(version);
    if (this.identity.isLoggedIn) {
      return this.http.put(url, payload).pipe(
        map(x => null as unknown as void)
      ).toPromise();
    } else {
      return this.updatePrivacyVersionCookie(version);
    }
  }

  /**
   * Note: This is a non-standard endpoint for WCS. It is mapped to fetch the profile using BOD services, to ensure format is
   * the same as @self.
   */
  protected getProfileByIdURL(id: string): string {
    return this.config.getWcsEndpointUrl('person') + '/byId/' + id;
  }

  /**
   * Helper function to calculate the url to call
   */
  protected getSelfUrl(): string {
    return this.basepath + '/@self';
  }

  /**
   * Helper function to calculate the url to call
   */
  protected getAddAddressBookURL(): string {
    const url: string = this.getSelfUrl() + '/contact';
    return url;
  }
  /**
   * Helper function to calculate the url to call
   */
  protected getUpdateRemoveAddressBookURL(nickName: string): string {
    const url: string = this.getSelfUrl() + '/contact/' + nickName;
    return url;
  }

  protected getUpdatePrivacyPolicyAcceptanceURL(version: string): string {
    return this.getSelfUrl();
  }

  protected getChangeMarketingConsentURL(consent: boolean): string {
    return this.config.getWcsEndpointUrl('event') + '/update_marketing_tracking_consent';
  }

  protected getChangeMarketingConsentPayload(consent: boolean): any {
    const body: any = {};
    body.marketingTrackingConsent = consent ? '1' : '0';
    return body;
  }

  protected getProfileByIdParams(id: string): HttpParams {
    return new HttpParams();
  }

  protected getSelfParams(): HttpParams {
    return new HttpParams();
  }

  protected getUpdatePrivacyPolicyAcceptancePayload(version: string): any {
    const body: any = {};
    body.userId = this.identity.userId;
    body.privacyNoticeVersion = '' + version;
    return body;
  }

  /**
   * Populates the payload for the update profile call.
   *
   * This unfortunately cannot be shared with UserAccountProviders version of the same call, due to
   * backend updating "self" via BOD services, and "csr operations" via normal command mappings.
   */
  protected getUpdateProfileInfoPayload(profile: WCSProfile): any {
    const body: any = {};
    let userId = profile.userId;

    // if it is the first update, or if you instantiate via newInstance rather than newInstanceFromProfile
    // we might not have the users id yet, so we fall back to getting it from the identity.
    if (!userId) {
      userId = this.identity.userId;
    }

    if (userId !== undefined) {
      body.userId = userId;
    }
    if (profile.firstName !== undefined) {
      body.firstName = profile.firstName;
    }
    if (profile.lastName !== undefined) {
      body.lastName = profile.lastName;
    }
    if (profile.email !== undefined) {
      body.email1 = profile.email;
    }
    if (profile.phone !== undefined) {
      body.phone1 = profile.phone;
    }
    if (profile.dateOfBirth !== undefined) {
      if (profile.dateOfBirth !== null) {
        // Months in the JS Date type are 0-indexed, because...
        body.dateOfBirth =
          profile.dateOfBirth.getFullYear() + '-' + (profile.dateOfBirth.getMonth() + 1) + '-' + profile.dateOfBirth.getDate();
      } else {
        body.dateOfBirth = '';
      }
    }
    if (profile.gender !== undefined) {
      body.gender = profile.gender;
    }
    if (profile.attributes && profile.attributes.size > 0) {
      body.contextAttribute = [];
      profile.attributes.forEach((value: string, key: string) => {
        body.contextAttribute.push({
          attributeName: key,
          attributeValue: {
            value,
          },
        });
      });
    }

    body.personTitle = profile.salutation || '';
    body.middleName = profile.middleName || '';

    // dont store gravatar images
    if (profile.photo && !profile.photo.startsWith('https://www.gravatar.com')) {
      body.photoURI = profile.photo || '';
    }
    body.businessTitle = profile.businessTitle || '';
    body.numberOfChildren = (profile.numberOfChildren || 0) + '';
    body.householdSize = (profile.householdSize || 0) + '';

    body.maritalStatus = 'O';
    if (profile.maritalStatus === 'Married') {
      body.maritalStatus = 'M';
    }
    if (profile.maritalStatus === 'Single') {
      body.maritalStatus = 'S';
    }
    if (profile.maritalStatus === 'Widowed') {
      body.maritalStatus = 'W';
    }
    if (profile.maritalStatus === 'Divorced') {
      body.maritalStatus = 'D';
    }
    if (profile.maritalStatus === 'Separated') {
      body.maritalStatus = 'S';
    }
    if (profile.maritalStatus === 'CommonLaw') {
      body.maritalStatus = 'C';
    }

    return body;
  }

  /**
   * Helper function to calculate the url parameters
   */
  protected getAddressBookAddressPayload(address: Address): any {
    const body: any = {
      selfAddress: '0',
      URL: 'NoURL',
      primary: '' + Boolean(address.isPrimary),
    };

    if (address.firstName !== undefined) {
      body.firstName = '' + address.firstName;
    }
    if (address.lastName !== undefined) {
      body.lastName = '' + address.lastName;
    }
    if (address.email !== undefined) {
      body.email1 = '' + address.email;
    }
    if (address.phone !== undefined) {
      body.phone1 = '' + address.phone;
    }
    if (address.nickName !== undefined) {
      body.nickName = '' + address.nickName;
    }
    if (address.address1 !== undefined) {
      body.addressLine = ['' + address.address1];
      if (address.address2 !== undefined) {
        body.addressLine.push(address.address2);
      }
    }
    if (address.city !== undefined) {
      body.city = '' + address.city;
    }
    if (address.zip !== undefined) {
      body.zipCode = '' + address.zip;
    }
    if (address.country !== undefined) {
      body.country = '' + address.country;
    }
    if (address.state !== undefined) {
      body.state = '' + address.state;
    }

    if (address.isShippingAddress && address.isBillingAddress) {
      body.addressType = 'ShippingAndBilling';
    } else if (address.isShippingAddress) {
      body.addressType = 'Shipping';
    } else if (address.isBillingAddress) {
      body.addressType = 'Billing';
    } else {
      body.addressType = '';
    }

    // http://stackoverflow.com/questions/17843215/typescript-extend-string-static
    return body;
  }

  /**
   * Helper function to deserialize the result
   */
  protected convertToProfile(): (res: any) => Profile {
    return res => {
      // patch up the response to add the consent and privacy policy stuff
      // if server did not return it, and user is a guest user.
      if (!this.identity.isLoggedIn) {
        if (res && !res.contextAttribute) {
          res.contextAttribute = [];
          res.contextAttribute.push(
            this.createAttribute('marketingTrackingConsent', this.getCookieName(this.marketingConsentCookiePrefix)),
          );
          res.contextAttribute.push(
            this.createAttribute('marketingTrackingConsentTimestamp', this.getCookieName(this.marketingConsentCookiePrefix + 'TimeStamp')),
          );
          res.contextAttribute.push(
            this.createAttribute('privacyNoticeVersion', this.getCookieName(this.privacyPolicyVersionCookiePrefix)),
          );
          res.contextAttribute.push(
            this.createAttribute('privacyNoticeTimestamp', this.getCookieName(this.privacyPolicyVersionCookiePrefix + 'TimeStamp')),
          );
        }
      }

      return this.profileFactory.newInstanceFromJSON(res);
    };
  }

  protected createAttribute(name: string, cookieName: string): any {
    return {
      attributeName: name,
      attributeValue: [
        {
          storeId: '' + this.config.storeId,
          value: [this.cookieService.get(cookieName)],
        },
      ],
    };
  }

  protected getCookieName(baseName: string): string {
    return `${baseName}_${this.config.storeId}_${this.identity.userId}`;
  }

  /**
   * For guest users, we have to store the setting locally, in order to be
   * able to read it back if we need to. For registered customers we dont store a cookie.
   */
  protected updateConsentCookie(consent: boolean): Promise<void> {
    if (!this.identity.isLoggedIn) {
      this.cookieService.setWithUniquePrefix(
        this.marketingConsentCookiePrefix + '_',
        this.getCookieName(this.marketingConsentCookiePrefix),
        consent ? '1' : '0',
        false,
      );
      this.cookieService.setWithUniquePrefix(
        this.marketingConsentCookiePrefix + 'TimeStamp_',
        this.getCookieName(this.marketingConsentCookiePrefix + 'TimeStamp'),
        new Date().toUTCString(),
        false,
      );
    }
    return Promise.resolve();
  }

  /**
   * For guest users, we have to store the setting locally, in order to be
   * able to read it back if we need to. For registered customers we dont store a cookie.
   */
  protected updatePrivacyVersionCookie(version: string): Promise<void> {
    if (!this.identity.isLoggedIn) {
      this.cookieService.setWithUniquePrefix(
        this.privacyPolicyVersionCookiePrefix + '_',
        this.getCookieName(this.privacyPolicyVersionCookiePrefix),
        version,
        false,
      );
      this.cookieService.setWithUniquePrefix(
        this.privacyPolicyVersionCookiePrefix + 'TimeStamp_',
        this.getCookieName(this.privacyPolicyVersionCookiePrefix + 'TimeStamp'),
        new Date().toUTCString(),
        false,
      );
    }
    return Promise.resolve();
  }
}
