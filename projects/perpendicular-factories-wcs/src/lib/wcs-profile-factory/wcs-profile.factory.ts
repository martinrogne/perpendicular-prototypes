import { Injectable } from '@angular/core';
import { Address, IAddressFactory, IProfileFactory, Profile, ProvidersWCSConfig } from 'perpendicular-core';
import { WCSProfile } from 'perpendicular-models-wcs';

/**
 * A factory to deserialize profile information about a user from WebSphere Commerce.
 */
@Injectable()
export class WCSProfileFactory extends IProfileFactory {
  /**
   * Default constructor. Do not instantiate this class directly. Get it from the DI framework.
   */
  constructor(public addressFactory: IAddressFactory, public config: ProvidersWCSConfig) {
    super();
  }

  /**
   * Instantiates a new profile model.
   */
  public newInstance(): Profile {
    const l: WCSProfile = new WCSProfile();
    return l;
  }

  /**
   * Instantiates a new Profile object, and deserializes the json coming from WebSphere Commerce.
   */
  public newInstanceFromJSON(json: any): Profile {
    const l: Profile = this.composeProfile(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  public newInstanceFromProfile(profile: Profile): Profile {
    const l: WCSProfile = this.newInstance() as WCSProfile;
    const p: WCSProfile = profile as WCSProfile;
    l.addressBook = new Array<Address>();
    for (const oldAddr of l.addressBook) {
      const newAddr = this.addressFactory.newInstanceFromAddress(oldAddr);
      l.addressBook.push(newAddr);
    }

    l.attributes = new Map();
    profile.attributes.forEach((value, key) => {
      l.attributes.set(key, value);
    });

    l.dateOfBirth = p.dateOfBirth;
    l.email = p.email;
    l.salutation = p.salutation;
    l.firstName = p.firstName;
    l.middleName = p.middleName;
    l.lastName = p.lastName;
    l.photo = p.photo;
    l.businessTitle = p.businessTitle;
    l.householdSize = p.householdSize;
    l.maritalStatus = p.maritalStatus;
    l.numberOfChildren = p.numberOfChildren;
    l.gender = p.gender;
    l.marketingConsent = profile.marketingConsent;
    l.marketingConsentLastUpdated = profile.marketingConsentLastUpdated;
    l.parentOrganizationId = profile.parentOrganizationId;
    l.phone = profile.phone;
    l.primaryAddress = undefined;

    if (profile.primaryAddress) {
      const nickName = profile.primaryAddress.nickName;
      const primary = l.addressBook.find(x => x.nickName === nickName);

      l.primaryAddress = primary;
    }
    l.privacyPolicyAcceptLastUpdated = profile.privacyPolicyAcceptLastUpdated;
    l.privacyPolicyAcceptVersion = profile.privacyPolicyAcceptVersion;
    l.userId = profile.userId;

    return l;
  }

  /**
   * Extension point for overriding the default json deserialization logic.
   */
  protected composeProfile(json: any): Profile {
    const profile: WCSProfile = this.newInstance() as WCSProfile;

    if (json === undefined) {
      return profile;
    }

    if (json.contact !== undefined) {
      for (const addrIdx in json.contact) {
        if (!json.contact.hasOwnProperty(addrIdx)) {
          continue;
        }
        const tmpAddress: Address = this.addressFactory.newInstanceFromJSON(json.contact[addrIdx]);
        profile.addressBook.push(tmpAddress);
      }
    }

    profile.primaryAddress = profile.addressBook.find(x => x.isPrimary === true);

    // registered users have this filled in. This is the "Self" address.
    // Only registered users can store a name and primary contact information.
    profile.salutation = json.personTitle || '';
    profile.businessTitle = json.businessTitle || '';
    profile.firstName = json.firstName || '';
    profile.middleName = json.middleName || '';
    profile.lastName = json.lastName || '';
    profile.phone = json.phone1 || '';
    profile.email = json.email1 || '';
    if (!!json.dateOfBirth) {
      profile.dateOfBirth = new Date(json.dateOfBirth);
      /**
       * Zeroing out the hours, because this is a date, and the server and client may disagree
       * on the timezone. FIXME: consider switching to moment.js or similar, to handle time and dates
       * somewhat more appropriately.
       */
      profile.dateOfBirth.setHours(0);
    }
    profile.gender = json.gender || 'Unspecified';
    profile.maritalStatus = json.maritalStatus || '';
    profile.householdSize = Number(json.householdSize);
    profile.numberOfChildren = Number(json.numberOfChildren);

    profile.photo = json.photoURI || '';

    if (!!json.contextAttribute) {
      for (const ca of json.contextAttribute) {
        if (!this.isPrivacyPolicyAttr(ca) && !this.isMarketingConsentAttr(ca)) {
          profile.attributes.set(ca.attributeName, ca.attributeValue[0].value[0]);
        }
        if (this.isPrivacyPolicyAttr(ca)) {
          this.composePrivacyPolicyFields(profile, ca);
        }
        if (this.isMarketingConsentAttr(ca)) {
          this.composeMarketingConsentFields(profile, ca);
        }
      }
    }

    profile.parentOrganizationId = json.orgizationId;
    profile.userId = json.userId;
    return profile;
  }

  protected composePrivacyPolicyFields(profile: Profile, ca: any): void {
    if (ca.attributeName === 'privacyNoticeVersion') {
      const val = this.getStoreSpecificAttributeValue(ca);
      profile.privacyPolicyAcceptVersion = val || '';
    }
    if (ca.attributeName === 'privacyNoticeTimestamp') {
      const val = this.getStoreSpecificAttributeValue(ca);
      profile.privacyPolicyAcceptLastUpdated = val ? new Date(val) : undefined;
    }
  }
  protected composeMarketingConsentFields(profile: Profile, ca: any): void {
    if (ca.attributeName === 'marketingTrackingConsent') {
      const val = this.getStoreSpecificAttributeValue(ca);
      profile.marketingConsent = val === '1';
    }
    if (ca.attributeName === 'marketingTrackingConsentTimestamp') {
      const val = this.getStoreSpecificAttributeValue(ca);
      profile.marketingConsentLastUpdated = val ? new Date(val) : undefined;
    }
  }

  protected isPrivacyPolicyAttr(ca: any): boolean {
    if (ca.attributeName === 'privacyNoticeVersion') {
      return true;
    }
    if (ca.attributeName === 'privacyNoticeTimestamp') {
      return true;
    }

    return false;
  }

  protected isMarketingConsentAttr(ca: any): boolean {
    if (ca.attributeName === 'marketingTrackingConsent') {
      return true;
    }
    if (ca.attributeName === 'marketingTrackingConsentTimestamp') {
      return true;
    }

    return false;
  }

  protected getStoreSpecificAttributeValue(ca: any): string {
    const val = ca.attributeValue.find((x: any) => x.storeId === '' + this.config.storeId);
    return val ? val.value[0] : '';
  }
}

export type ProfileFactory = typeof WCSProfileFactory;
