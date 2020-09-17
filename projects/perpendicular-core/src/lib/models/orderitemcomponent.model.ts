/**
 * This class represents a component that is part of a kit (dynamic or otherwise).
 */
export class OrderItemComponent {
  /**
   * The SKU ID of the component
   */
  public productId?: string;

  /**
   * Quantity of the component in the cart
   */
  public quantity = 0;

  /**
   * Unit price of component. This is only filled in, if the server stamped specific prices on
   * the component. Otherwise it will use the current price from the pricelist, but that wont be
   * available here.
   */
  public unitPrice = 0;

  /**
   * Total price of component (calculated)
   */
  public totalPrice = 0;

  /**
   * ISO Code of currency for the prices
   */
  public currency = '';
}
