
/**
 * Enum of sort methods for requisition lists
 */
export enum RequsitionListSearchSortType {
  /**
   * Sort by ID, natural sort.
   */
  SORT_ID = 0,

  /**
   * Sort by ID, natural sort, reverse order.
   */
  SORT_ID_DSC,

  /**
   * Sort by owners first and last name
   */
  SORT_OWNER,

  /**
   * Sort by owners first and last name, descending
   */
  SORT_OWNER_DSC,


  /**
   * Sort by list name, this is default
   */
  SORT_NAME,

  /**
   * Sort by list name, descending
   */
  SORT_NAME_DSC,


  /**
   * Sort by last updated.
   */
  SORT_LAST_UPDATE,

  /**
   * Sort by last updated, descending.
   */
  SORT_LAST_UPDATE_DSC,
}

/**
 * A Model class representing RequisitionListSearchQuery
 *
 * @see IRequisitionListSearchQueryFactory
 */
export class RequisitionListSearchQuery {

  /**
   * set to true, to only get the requisition lists that you can edit
   */
  public onlyMine: boolean;

  /**
   * How many to fetch, defaults to 10
   */
  public pageSize: number;

  /**
   * Page to fetch, defaults to 1;
   */
  public pageNumber: number;

  /**
   * How to sort the returned values. Defaults to SORT_NAME;
   */
  public sortBy: RequsitionListSearchSortType;

  /**
   * Default constructor, acts as copy constructor
   */
  constructor(prevQuery?: RequisitionListSearchQuery) {
    if (!!prevQuery) {
      this.onlyMine = prevQuery.onlyMine;
      this.pageSize = prevQuery.pageSize;
      this.pageNumber = prevQuery.pageNumber;
      this.sortBy = prevQuery.sortBy;
    } else {
      this.onlyMine = false;
      this.pageSize = 10;
      this.pageNumber = 1;
      this.sortBy = RequsitionListSearchSortType.SORT_NAME;
    }
  }
}
