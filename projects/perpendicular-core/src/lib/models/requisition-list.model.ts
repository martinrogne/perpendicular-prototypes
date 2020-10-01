import { BaseModel } from './base.model';
import { RequisitionListItem } from './requisition-list-item.model';

/**
 * A Model class representing RequisitionList
 * A requisition list holds a bunch of products and some quantities, and you can
 * add comments to each item, in order to tell what its for.
 *
 * A requisition list can be either Shared with other members of your organization or not.
 *
 * Typically, only the creator/owner of the list can edit it. Check the `isReadOnly` to see if this
 * list would allow you to edit it both directly (setting name and comment), or indirectly (adding items to it)
 *
 * @see IRequisitionListFactory
 */
export class RequisitionList extends BaseModel {

  /**
   * ID of the RequisitionList
   */
  public id?: string;

  /**
   * Name of requisition list
   */
  public name = '';

  /**
   * Description of requisition list
   */
  public description = '';

  /**
   * full name of owner that created the list.
   */
  public owner = '';

  /**
   * Indicates if you can add and remove things from this list.
   */
  public isReadOnly = false;

  /**
   * Indicates if this is a shared requisition list. I.e. that others from your organization can see
   * it too.
   */
  public isShared = false;

  /**
   * The date at which the requisition list was last updated
   */
  public lastUpdate?: Date;

  /**
   * items on the RequisitionList
   */
  public items: Array<RequisitionListItem> = [];
}

