import { ProductSearchQuery, ProductSearchResult } from '../models/productsearch.model';
import { Product } from '../models/product.model';
import { ISearchProvider } from './base.search.provider';

/**
 * This provider is responsible for fetching products from the backend
 */
export abstract class IProductSearchProvider extends ISearchProvider<Product, ProductSearchQuery, ProductSearchResult> {
  /**
   * Fetches a specific product from the backend.
   * Presumably with more data than was fetched in the search result
   * call.
   */
  public abstract getProductById(pId: string | string[]): Promise<Array<Product>>;

  /**
   * Fetches a specific product from the backend based on its partNumber. This is occasionally useful, if for instance
   * you allow the customer to paste in a spreadsheet to quick-fill a basket.
   */
  public abstract getProductByPartnumber(partnumber: string): Promise<Product>;
}
