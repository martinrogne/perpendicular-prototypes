import { CartItem } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSCartItem extends CartItem {
  /**
   * Unit of measure for this item
   */
  public unitOfMeasure = '';

  /**
   * Default constructor
   */
  constructor() {
    super();
  }
}
