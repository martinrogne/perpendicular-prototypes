import { Injectable } from '@angular/core';
import {
  IIdentityService,
  IProductFactory,
  IProductSearchProvider,
  IProductSearchService,
  ProductSearchResult,
  ProductSearchSortMethod
} from 'perpendicular-core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ModifiableState } from '../testutils/utils';

@Injectable()
export class MockProductSearchService extends IProductSearchService implements ModifiableState<ProductSearchResult> {

  public sortMethod: ProductSearchSortMethod = ProductSearchSortMethod.RELEVANCY;

  /**
   * See [[IProductSearchService]]
   */
  public internalState: BehaviorSubject<ProductSearchResult>;

  /**
   * See [[IProductSearchService]]
   */
  public initialState: ProductSearchResult;

  /**
   * See [[IProductSearchService]]
   */
  constructor(public factory: IProductFactory) {
    super(null as unknown as IProductSearchProvider, factory, null as unknown as IIdentityService);
    this.initialState = this.factory.newResultInstance(0, 1, [], this.factory.newQueryInstance());
    this.internalState = new BehaviorSubject(this.initialState);

    spyOn(this as IProductSearchService, 'newSearchForCategory').and.callThrough();
    spyOn(this as IProductSearchService, 'setSearchTerm').and.callThrough();
    spyOn(this as IProductSearchService, 'setCategoryId').and.callThrough();
    spyOn(this as IProductSearchService, 'getSearchTerm').and.callThrough();
    spyOn(this as IProductSearchService, 'getCategoryId').and.callThrough();
    spyOn(this as IProductSearchService, 'toggleFacet').and.callThrough();
    spyOn(this as IProductSearchService, 'newSearchForSearchTerm').and.callThrough();
    spyOn(this as IProductSearchService, 'addFilter').and.callThrough();
    spyOn(this as IProductSearchService, 'removeFilter').and.callThrough();
    spyOn(this as IProductSearchService, 'getFilter').and.callThrough();
  }

  /**
   * See [[IProductSearchService]]
   */
  public emitNewState(data: ProductSearchResult): void {
    this.internalState.next(data);
  }
  /**
   * See [[IProductSearchService]]
   */
  public get state(): Observable<ProductSearchResult> {
    return this.internalState.asObservable();
  }

  /**
   * See [[IProductSearchService]]
   */
  public setSearchTerm(s: string): void {}
  /**
   * See [[IProductSearchService]]
   */
  public getSearchTerm(): string {
    return '';
  }
  /**
   * See [[IProductSearchService]]
   */
  public setCategoryId(categoryId: string): void {}
  /**
   * See [[IProductSearchService]]
   */
  public getCategoryId(): string {
    return '0';
  }
  /**
   * See [[IProductSearchService]]
   */
  public toggleFacet(s: string): void {}
  /**
   * See [[IProductSearchService]]
   */
  public queryHasFacet(s: string): boolean {
    return false;
  }
  /**
   * See [[IProductSearchService]]
   */
  public newSearchForSearchTerm(s: string): void {
  }

  /**
   * See [[IProductSearchService]]
   */
  public newSearchForCategory(categoryId: string): void {
  }

  /**
   * See [[IProductSearchService]]
   */
  public addFilter(fieldName: string, filter: string): void {}

  /**
   * See [[IProductSearchService]]
   */
  public removeFilter(fieldName: string): void {}

  /**
   * See [[IProductSearchService]]
   */
  public getFilter(fieldName: string): string {
    return '';
  }
}
