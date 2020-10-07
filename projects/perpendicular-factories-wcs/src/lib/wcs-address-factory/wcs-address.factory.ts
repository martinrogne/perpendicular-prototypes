import { WCSAddress } from 'perpendicular-models-wcs';
import { Injectable } from '@angular/core';
import { Address, IAddressFactory } from 'perpendicular-core';

/**
 * A factory to deserialize profile information about a addresses from WebSphere Commerce.
 */
@Injectable()
export class WCSAddressFactory extends IAddressFactory {
  /**
   * Default constructor. Do not instantiate this class directly. Get it from the DI framework.
   */
  constructor() {
    super();
  }

  /**
   * Instantiates a new profile model.
   */
  public newInstance(): Address {
    const l: Address = new WCSAddress();
    return l;
  }

  /**
   * Instantiates a new Profile object, and deserializes the json coming from WebSphere Commerce.
   * The returned object is ReadOnly.
   */
  public newInstanceFromJSON(json: any): Address {
    const l: Address = this.composeAddress(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  /**
   * Instantiates a new Address object and copies values from the passed object.
   * Use this when editing addresses, to ensure you are not editing a "live" object.
   * The purpose of this object is only to be sent to the service layer for processing.
   *
   * The returned object is ReadWrite.
   */
  public newInstanceFromAddress(oldAddress: Address): Address {
    const address: Address = this.newInstance();

    address.firstName = oldAddress.firstName;
    address.lastName = oldAddress.lastName;
    address.nickName = oldAddress.nickName;
    address.email = oldAddress.email;
    address.phone = oldAddress.phone;
    address.address1 = oldAddress.address1;
    address.address2 = oldAddress.address2;
    address.zip = oldAddress.zip;
    address.city = oldAddress.city;
    address.state = oldAddress.state;
    address.country = oldAddress.country;
    address.isShippingAddress = oldAddress.isShippingAddress;
    address.isBillingAddress = oldAddress.isBillingAddress;
    address.id = undefined;
    address.isPrimary = oldAddress.isPrimary;

    return address;
  }

  /**
   * Deserializer from backend service
   */
  protected composeAddress(json: any): Address {
    const address: Address = this.newInstance();
    if (json.addressLine) {
      address.address1 = json.addressLine[0];
      address.address2 = json.addressLine[1];
    }

    // WCS has two different address layouts... smart
    if (json.address1 && !json.addressLine) {
      address.address1 = json.address1;
      address.address2 = json.address2;
    }
    // WCS Hack
    if (address.address2 === 'null') {
      address.address2 = undefined;
    }
    address.firstName = json.firstName;
    address.lastName = json.lastName;
    address.email = json.email1;
    address.phone = json.phone1;
    address.zip = json.zipCode;
    address.city = json.city;
    address.country = json.country;
    address.state = json.state;

    if (json.addressId) {
      address.id = String(json.addressId);
    }

    if (json.billing_address_id) {
      address.id = String(json.billing_address_id);
    }

    address.isBillingAddress =
      json.addressType === 'Billing' || json.addressType === 'ShippingAndBilling' || json.addressType === 'B' || json.addressType === 'SB';
    address.isShippingAddress =
      json.addressType === 'Shipping' || json.addressType === 'ShippingAndBilling' || json.addressType === 'S' || json.addressType === 'SB';

    address.isPrimary = json.primary ? json.primary === 'true' : false;
    address.nickName = json.nickName;
    address.ownerId = json.memberId || '';
    return address;
  }
}
