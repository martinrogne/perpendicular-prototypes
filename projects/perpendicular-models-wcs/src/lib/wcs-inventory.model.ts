import { Inventory } from 'perpendicular-core';

/**
 * Provider specific version of the model
 */
export class WCSInventory extends Inventory {
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
