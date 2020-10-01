import { BaseModel } from './base.model';

/**
 * A Model class representing RequisitionListItem
 * We do not pre-load the products for this item, as 99% of the time, it wont be used for anything.
 *
 * @see IRequisitionListItemFactory
 */
export abstract class RequisitionListItem extends BaseModel {

  /**
   * ID of the RequisitionListItem
   */
  public id?: string;

  /**
   * number of entries
   */
  public quantity = 0;

  /**
   * The ID of the product on this item
   */
  public productId?: string;

  /**
   * Any comment for this item.
   */
  public comment = 0;
}
