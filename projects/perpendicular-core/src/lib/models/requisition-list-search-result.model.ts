import { RequisitionListSearchQuery } from './requisition-list-search-query.model';
import { RequisitionList } from './requisition-list.model';

/**
 * A Model class representing RequisitionListSearchResult
 * Represents a single page of results.
 *
 * @see IRequisitionListSearchResultFactory
 */
export class RequisitionListSearchResult<
  RequisitionListType extends RequisitionList = RequisitionList,
  RequisitionListSearchQueryType extends RequisitionListSearchQuery = RequisitionListSearchQuery
> {
  /**
   * Default constructor
   */
  constructor(
    public totalCount: number,
    public pageNumber: number,
    public requsitionLists: RequisitionListType[],
    public query: RequisitionListSearchQueryType,
  ) {
    // be sure to initialize all arrays to empty arrays here.
  }
}
