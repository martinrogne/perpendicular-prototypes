import { ISearchService } from './base.search.service';
import { Product } from '../models/product.model';
import { ProductSearchResult, ProductSearchSortMethod, ProductSearchQuery } from '../models/productsearch.model';

export abstract class IProductSearchService<
  ProductType extends Product = Product,
  ProductSearchQueryType extends ProductSearchQuery = ProductSearchQuery,
  ProductSearchResultType extends ProductSearchResult<ProductType, ProductSearchQueryType> = ProductSearchResult<
    ProductType,
    ProductSearchQueryType
  >
> extends ISearchService<ProductType, ProductSearchQueryType, ProductSearchResultType> {
  public abstract sortMethod: ProductSearchSortMethod;

  public abstract setSearchTerm(s: string): void;
  public abstract getSearchTerm(): string;
  public abstract setCategoryId(categoryId: string): void;
  public abstract getCategoryId(): string;
  public abstract toggleFacet(s: string): void;
  public abstract queryHasFacet(s: string): boolean;
  public abstract newSearchForSearchTerm(s: string): void;
  public abstract newSearchForCategory(categoryId: string): void;
  public abstract addFilter(fieldName: string, filter: string): void;
  public abstract removeFilter(fieldName: string): void;
  public abstract getFilter(fieldName: string): string;
}
