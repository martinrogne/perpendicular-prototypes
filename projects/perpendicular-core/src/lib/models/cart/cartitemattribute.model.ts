import { BaseModel } from '../base.model';

/**
 * This class represents an attribute as can be set on any item added to cart
 */
export class CartItemAttribute extends BaseModel {
  /**
   * The name of the attribute
   */
  public name = '';

  /**
   * The value of the attribute
   */
  public value = '';

  /**
   * The type of the attribute.
   */
  public type = '';
}
