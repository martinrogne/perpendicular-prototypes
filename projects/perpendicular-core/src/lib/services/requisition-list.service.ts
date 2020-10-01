import { Observable } from 'rxjs';

import { RequisitionListSearchResult } from '../models/requisition-list-search-result.model';
import { RequsitionListSearchSortType, RequisitionListSearchQuery } from '../models/requisition-list-search-query.model';
import { RequisitionList } from '../models/requisition-list.model';
import { Product } from '../models/product.model';
import { RequisitionListItem } from '../models/requisition-list-item.model';

/**
 * Stateful service for operating on [[RequisitionList ]].
 */
export abstract class IRequisitionListService<
  RequisitionListType extends RequisitionList = RequisitionList,
  RequisitionListSearchQueryType extends RequisitionListSearchQuery = RequisitionListSearchQuery,
  RequisitionListSearchResultType extends RequisitionListSearchResult<
    RequisitionListType,
    RequisitionListSearchQueryType
  > = RequisitionListSearchResult<RequisitionListType, RequisitionListSearchQueryType>
> {
  /**
   * Subscribe to this to get information about the current customers RequisitionList
   * information.
   */
  public get state(): Observable<RequisitionListSearchResultType> {
    throw new Error('Not Implemented');
  }

  /**
   * Number of orders to return pr page.
   */
  public abstract pageSize: number;

  /**
   * Filters result set to only contain the current users own lists.
   */
  public abstract onlyMine: boolean;

  /**
   * The page number that was being asked to be shown. 1 being the first page.
   */
  public abstract pageNumber: number;

  /**
   * The sort order
   */
  public abstract sortBy: RequsitionListSearchSortType;

  /**
   * Resets the search, and returns the default query.
   */
  public abstract reset(): void;

  /**
   * Creates a new requisition list, with the name given.
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract addList(name: string, isShared: boolean): void;

  /**
   * Deletes the requisition list, along with all items
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract removeList(list: RequisitionListType): void;

  /**
   * Updates name and shareability of a requisition list
   *
   * @param name the name of the requisiton list
   * @param isShared set to true, to share this with other members of your organization
   */
  public abstract updateList(list: RequisitionListType, newName: string, isShared: boolean): void;

  /**
   * Adds an item to the list
   * After the command finishes, you can use the [[IRequisitionListRegistry]] to load the list with details.
   *
   * @param list the requisition list to add the item to
   * @param product the product to add
   * @param quantity the amount of product to add
   * @return a promise that resolves when the operation is done.
   */
  public abstract addItem(list: RequisitionListType, product: Product, quantity: number): Promise<void>;

  /**
   * Removes item from the list
   * After the command finishes, you can use the [[IRequisitionListRegistry]] to load the list with details.
   *
   * @param list the requisition list to add the item to
   * @param item the requistion list item to remove
   */
  public abstract removeItem(list: RequisitionListType, item: RequisitionListItem): Promise<void>;

  /**
   * Updates quantity on item
   * After the command finishes, you can use the [[IRequisitionListRegistry]] to load the list with details.
   *
   * @param list the requisition list to add the item to
   * @param item the requistion list item to update
   * @param quantity the quantity to set
   * @param comment if set, will add the comment to the item
   */
  public abstract updateItem(list: RequisitionListType, item: RequisitionListItem, quantity: number, comment?: string): Promise<void>;
}
