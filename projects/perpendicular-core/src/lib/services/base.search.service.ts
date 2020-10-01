import { switchMap, debounceTime } from 'rxjs/operators';
import { Subject, Observable, BehaviorSubject, from as observableFrom } from 'rxjs';
import { BaseSearchQuery, BaseSearchResult } from './../models/base.search.model';
import { IIdentityService } from '../services/identity.service';
import { ISearchProvider } from '../providers/base.search.provider';
import { ISearchFactory } from '../factories/base.factory';
import { Identity } from '../models/identity.model';
/**
 * Shared interface for all searchable services, to deal with things like paging
 *
 * Takes three types in,
 * @param T The type of entity that the result returns. I.e something from `model`
 * @param Q The type of query class that this is a result for. Must extend [[BaseSearchQuery]]
 * @param R the type of the result class that the search service is using. Must extend [[BaseSearchResult]]
 */
export class ISearchService<T, Q extends BaseSearchQuery, R extends BaseSearchResult<T, Q>> {
  protected query: Q;
  protected queue: Subject<Q>;
  protected internalState: BehaviorSubject<R>;

  /**
   * Constructor
   * @param isIdentitySensitive set to true, if the search should re-execute on identity changes
   */
  constructor(
    public provider: ISearchProvider<T, Q, R>,
    public factory: ISearchFactory<T, Q, R>,
    public identityService: IIdentityService,
  ) {
    this.queue = new Subject<Q>();
    this.query = factory.newQueryInstance();
    this.internalState = new BehaviorSubject(factory.newResultInstance(0, 1, [], factory.newQueryInstance()));
    if (this.provider) {
      this.queue
        .asObservable()
        .pipe(
          debounceTime(10),
          switchMap((query: Q) => observableFrom(this.provider.getByQuery(query))),
        )
        .subscribe((res: R) => this.internalState.next(res), err => this.internalState.error(err));
    }
    if (this.identityService) {
      this.identityService.state.subscribe(x => {
        this.onIdentityChange(x);
      });
    }
  }

  public onIdentityChange(identity: Identity): void {
    this.executeQuery();
  }

  /**
   * Page number to show. 1 is first page.
   */
  public set pageNumber(value: number) {
    if (this.query.pageNumber !== value) {
      this.query.pageNumber = value > 0 ? value : 1;
      this.executeQuery();
    }
  }

  /**
   * Current page number set
   */
  public get pageNumber(): number {
    return this.query.pageNumber;
  }

  /**
   * Page size to fetch
   */
  public set pageSize(value: number) {
    if (this.query && this.query.pageSize !== value && value > 0) {
      this.query.pageSize = value;
      this.query.pageNumber = 1;
      this.executeQuery();
    }
  }

  /**
   * Currently set page size.
   */
  public get pageSize(): number {
    return this.query.pageSize;
  }

  /**
   * Subscribe to this to get information about the search result
   * information.
   */
  public get state(): Observable<R> {
    return this.internalState.asObservable();
  }

  /**
   * Helper method to load data for the state.
   */
  protected executeQuery(): void {
    this.queue.next(this.factory.newQueryInstance(this.query));
  }
}
