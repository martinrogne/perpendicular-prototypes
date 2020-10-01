import { RequisitionList } from '../models/requisition-list.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[RequisitionList]] information.
 * Will cache data for repeated lookups.
 */
export abstract class IRequisitionListRegistry<RequisitionListType extends RequisitionList = RequisitionList> extends IRegistry<
  RequisitionList
> {
  /**
   * Look up all details about the object based on its ID
   * @param id the id of the object to find.
   */
  public abstract getRequisitionList(id: string): Promise<RequisitionListType>;

  /**
   * Optionally, add additional ways of lookup up an object, by adding more getXXX functions.
   * public abstract getRequisitionListByOtherMeans(otherParameter1: string, otherParameter2): Promise<RequisitionList>;
   */
}
