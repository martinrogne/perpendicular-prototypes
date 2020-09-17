/**
 * A shippingmode defines the combination of a carrier and a shipping method. I.e. "PostNord, Home Delivery"
 */
export class ShippingMode {
  /**
   * Carrier that facilitates the shipping
   */
  public carrier = '';

  /**
   * Description of the shipping method
   */
  public description = '';

  /**
   * external identifier for this combination
   */
  public shipModeCode?: string;

  /**
   * The id of the shipping mode.
   */
  public id?: string;

  /**
   * Identifies if this shipping mode is reserved for pickup in store behavior
   */
  public isPickupInStoreShippingMode = false;

  /**
   * Cost of picking this shipping mode
   */
  public amount = 0;
}
