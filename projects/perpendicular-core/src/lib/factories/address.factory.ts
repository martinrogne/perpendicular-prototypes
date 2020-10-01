import { Inject, Injectable } from '@angular/core';

import { Address } from '../models/address.model';

/**
 * A factory to deserialize profile information about a user from WebSphere Commerce.
 */
@Injectable()
export abstract class IAddressFactory {
  /**
   * Instantiates a new address model.
   */
  public abstract newInstance(): Address;

  /**
   * Instantiates a new Address object, and deserializes the json coming from WebSphere Commerce.
   */
  public abstract newInstanceFromJSON(json: any): Address;

  /**
   * Instantiates a new Address object and copies values from the passed object.
   * Use this when editing addresses, to ensure you are not editing a "live" object.
   * The purpose of this object is only to be sent to the service layer for processing.
   *
   * The returned object is ReadWrite.
   */
  public abstract newInstanceFromAddress(oldAddress: Address): Address;
}
