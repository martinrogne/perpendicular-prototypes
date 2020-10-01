import { BaseModel } from './base.model';

/**
 * Represents an address within the system. An address can be associated either with an Organization, a Store or a Customer.
 * There is no back-link from this class to the owning entity.
 */
export class Address extends BaseModel {
  /**
   * ID of entity that owns this address
   */
  public ownerId?: string;

  /**
   * First name for postal address
   */
  public firstName = '';

  /**
   * Last name for postal address
   */
  public lastName = '';

  /**
   * Email associated with this address.
   */
  public email = '';

  /**
   * Phone number associated with this address.
   */
  public phone?: string;

  /**
   * Address line 1
   */
  public address1?: string;

  /**
   * Address line 2
   */
  public address2?: string;

  /**
   * Zip code (postal code) of address.
   */
  public zip?: string;

  /**
   * Postal city.
   */
  public city?: string;

  /**
   * Region of residence. Is optional, but can be used to calculate shipping costs.
   */
  public state?: string;

  /**
   * 2 letter abbrevation for country.
   */
  public country?: string;

  /**
   * Entity unique ID of this address.
   */
  public id?: string;

  /**
   * nickName Display name for this address. Must be unique within the entity the address is associated with.
   * Examples could be *Work*,*Home*, or other.
   */
  public nickName?: string;

  /**
   * Indicates if this is the default address for the user
   */
  public isPrimary = false;

  /**
   * True, if address can be used for shipping
   */
  public isShippingAddress = false;

  /**
   * True, if address can be used for billing
   */
  public isBillingAddress = false;
}
