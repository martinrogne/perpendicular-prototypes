import { RequisitionListItem } from '../models/requisition-list-item.model';
import { Product } from '../models/product.model';
import { RequisitionListSearchQuery } from './../models/requisition-list-search-query.model';
import { RequisitionList } from '../models/requisition-list.model';
import { RequisitionListSearchResult } from './../models/requisition-list-search-result.model';

/**
 * Provider to fetch [[RequisitionList]] from backend systems.
 */
export abstract class IRequisitionListProvider {
  /**
   * Loads single entry from backend
   */
  public abstract getRequisitionListById(id: string): Promise<RequisitionList>;

  /**
   * Loads all requisition lists the user can see (as headers only)
   */
  public abstract getCurrentState(query: RequisitionListSearchQuery): Promise<RequisitionListSearchResult>;

  /**
   * Creates a new requisition list, with the name given.
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract addList(name: string, isShared: boolean): Promise<void>;

  /**
   * Deletes the requisition list, along with all items
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract removeList(list: RequisitionList): Promise<void>;

  /**
   * Updates name and shareability of a requisition list
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract updateList(list: RequisitionList, newName: string, isShared: boolean): Promise<void>;

  /**
   * Adds an item to the list
   *
   * @param list the requisition list to add the item to
   * @param product the product to add
   * @param quantity the amount of product to add
   */
  public abstract addItem(list: RequisitionList, product: Product, quantity: number): Promise<void>;

  /**
   * Removes item from the list
   *
   * @param list the requisition list to add the item to
   * @param item the requistion list item to remove
   */
  public abstract removeItem(list: RequisitionList, item: RequisitionListItem): Promise<void>;

  /**
   * Updates quantity on item
   *
   * @param list the requisition list to add the item to
   * @param item the requistion list item to update
   * @param quantity the quantity to set
   * @param comment if set, will add the comment to the item
   */
  public abstract updateItem(list: RequisitionList, item: RequisitionListItem, quantity: number, comment?: string): Promise<void>;
}
