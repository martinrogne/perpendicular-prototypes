import { Product, Attribute, AttributeValue, AngleImage, IProductFactory } from 'perpendicular-core';

/**
 * WebSphere Commerce specific implementation of [[Product]]
 */
export class WCSProduct extends Product {
  /**
   * The unit of measure for this product. Typically encoded in UN/CEFACT
   */
  public unitOfMeasure = '';

  /**
   * Weight pr unit
   */
  public weight = 0;

  /**
   * The unit of the weight in UN/CEFACT. Usually KGM or GRM
   */
  public weightUnitOfMeasure = '';

  /**
   * Height, shipped, pr unit
   */
  public height = 0;

  /**
   * Width, shipped, pr unit
   */
  public width = 0;

  /**
   * Length, shipped, pr unit
   */
  public length = 0;

  /**
   * The units for the size dimensions in UN/CEFACT. Usually cm, mm, or m.
   */
  public dimensionsUnitOfMeasure = '';

  /**
   * The nominal quantity. I.e. 3 for 1$, as the sales unit, would have this as 3.
   */
  public nominalQuantity = 0;

  /**
   * The multiplier that will be applied to the users entry
   */
  public quantityMultiple = 0;

  /**
   * Custom Constructor, specific to WebSphere Commerce.
   */
  constructor() {
    super();
  }
}
