import { ProductSearchService } from '@perpendicular/services-base';
import { Injectable } from '@angular/core';
import {
  IAnalyticsService,
  IIdentityService,
  IProductFactory,
  IProductSearchProvider,
  Product,
  ProductSearchQuery
} from '@perpendicular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, filter, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';

/**
 * Extended product search service which provides extra functionality
 * as a prototype for evaluation. It currently provides:
 *
 * 1) Route-integration, by reading and persisting parameters to the route
 * in order to enable back and forwards-navigation, as well as sharing
 * search links
 *
 * 2) Continuations for search results, allowing the larger and larger
 * set of products results to reside in-memory to support infinite
 * scrolling instead of hard pagination
 */
@Injectable()
export class PrototypeRoutableProductSearchService extends ProductSearchService {
  /**
   * The last query executed, for comparisons
   */
  public lastQuery: ProductSearchQuery | undefined;

  /**
   * The set of products that have been loaded so far,
   * used for continuations
   */
  public lastProductSet: Array<Product | undefined>;

  /**
   * The list of pages that have been requested so far
   */
  public requestedPages: Array<number>;

  /**
   * Default constructor
   */
  constructor(public identityService: IIdentityService,
              public provider: IProductSearchProvider,
              public factory: IProductFactory,
              public router: Router,
              public route: ActivatedRoute,
              public analyticsService: IAnalyticsService) {
    super(identityService, provider, factory, );

    this.lastProductSet = [];
    this.requestedPages = [];

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(x => {
      const params = this.route.snapshot.queryParams;

      if (params.searchTerm) {
        this.query.searchTerm = params.searchTerm;
        this.query.sortMethod = Number(params.sortMethod);
        this.query.pageSize = Number(params.pageSize);
        this.query.pageNumber = Number(params.pageNumber);
        this.query.facets = params.facets.split(',').filter((f: string) => f !== '');

        this.executeProviderQuery();
      }
    });

    // We have to terminate the old observers
    this.queue.observers.forEach(obs => obs.complete());

    // Rewire subscription to trigger searches
    this.queue
      .asObservable()
      .pipe(
        mergeMap((query: ProductSearchQuery) => from(this.provider.getByQuery(query))),
      )
      .subscribe(x => {
        if (this.lastQuery && this.isContinuation(this.lastQuery, x.query)) {
          // Continuation

        } else {
          // Non-continuation
          this.lastProductSet = [];
          this.lastProductSet.length = x.totalCount;
          this.lastProductSet = this.lastProductSet.fill(undefined, 0);
        }

        const positions = new Map<string, number>();

        for (let i = 0; i < x.result.length; i++) {
          const k = (x.pageNumber - 1) * x.query.pageSize + i;

          this.lastProductSet[k] = x.result[i];

          positions.set(x.result[i].productId, k);
        }

        this.analyticsService.trackProductImpressions(x.result, 'search', positions);

        x.result.splice(0, x.result.length);

        // @ts-ignore
        x.result.push(... this.lastProductSet);

        this._state.next(x);

        this.lastQuery = this.factory.newQueryInstance(x.query);
      });
  }

  /**
   * Main entry-point for search execution
   */
  protected executeQuery(): void {
    if (this.query.searchTerm) {
      this.router.navigate(
        ['/' , 'catalog', 'search', this.query.searchTerm],
        {
          queryParams: {
            searchTerm: this.query.searchTerm,
            sortMethod: this.query.sortMethod,
            pageSize: this.query.pageSize,
            pageNumber: this.query.pageNumber,
            facets: this.query.facets.join(',')
          }
        }
      );
    }
  }

  /**
   * Utility function to check if the new request is a continuation of
   * the previous requests, which is a request where only the page number
   * has changed
   */
  public isContinuation(oldQuery: ProductSearchQuery, newQuery: ProductSearchQuery): boolean {
    if (oldQuery.searchTerm !== newQuery.searchTerm) {
      return false;
    }

    if (oldQuery.sortMethod !== newQuery.sortMethod) {
      return false;
    }

    if (oldQuery.pageSize !== newQuery.pageSize) {
      return false;
    }

    if (oldQuery.facets.length !== newQuery.facets.length) {
      return false;
    }

    for (const facet of newQuery.facets) {
      if (oldQuery.facets.indexOf(facet) === -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Actual logic for pushing the request onto the queue
   */
  public executeProviderQuery(): void {
    if (this.query.categoryId || this.query.searchTerm) {
      if (this.lastQuery && this.isContinuation(this.lastQuery, this.query)) {
        if (this.requestedPages.indexOf(this.query.pageNumber) === -1) {
          this.requestedPages.push(this.query.pageNumber);
          super.executeQuery();
        }
      }
      else {
        this.requestedPages = [];
        super.executeQuery();
      }
    } else {
      this._state.next(this.factory.newResultInstance(0, 1, [], this.factory.newQueryInstance(this.query)));
    }
  }
}
