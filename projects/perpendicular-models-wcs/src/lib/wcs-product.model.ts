import { Product, Attribute, AttributeValue, AngleImage, IProductFactory } from 'perpendicular-core';

/**
 * WebSphere Commerce specific implementation of [[Product]]
 */
export class WCSProduct extends Product {
  /**
   * The unit of measure for this product. Typically encoded in UN/CEFACT
   */
  public unitOfMeasure: string;

  /**
   * Weight pr unit
   */
  public weight: number;

  /**
   * The unit of the weight in UN/CEFACT. Usually KGM or GRM
   */
  public weightUnitOfMeasure: string;

  /**
   * Height, shipped, pr unit
   */
  public height: number;

  /**
   * Width, shipped, pr unit
   */
  public width: number;

  /**
   * Length, shipped, pr unit
   */
  public length: number;

  /**
   * The units for the size dimensions in UN/CEFACT. Usually cm, mm, or m.
   */
  public dimensionsUnitOfMeasure: string;

  /**
   * The nominal quantity. I.e. 3 for 1$, as the sales unit, would have this as 3.
   */
  public nominalQuantity: number;

  /**
   * The multiplier that will be applied to the users entry
   */
  public quantityMultiple: number;

  /**
   * Custom Constructor, specific to WebSphere Commerce.
   */
  constructor() {
    super();
  }
}
