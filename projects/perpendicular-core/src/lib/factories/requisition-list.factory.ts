
import { RequisitionList } from '../models/requisition-list.model';
import { RequisitionListItem } from '../models/requisition-list-item.model';

/**
 * An abstract factory to create instances of [[RequisitionList]]
 */
export abstract class IRequisitionListFactory {
  /**
   * Creates a new [[RequisitionList]]
   */
  public abstract newInstance(): RequisitionList;


  /**
   * Deserializes a new  [[RequisitionList]] from a backend response from [[IRequisitionListProvider]]
   */
  public abstract newInstanceFromJSON(json: any): RequisitionList;

  /**
   * Creates a new [[RequisitionListItem]]
   */
  public abstract newItemInstance(): RequisitionListItem;


  /**
   * Deserializes a new  [[RequisitionListItem]] from a backend response from [[IRequisitionListProvider]]
   */
  public abstract newItemInstanceFromJSON(json: any): RequisitionListItem;

}
