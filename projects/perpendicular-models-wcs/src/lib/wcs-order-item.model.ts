import { OrderItem } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSOrderItem extends OrderItem {
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
