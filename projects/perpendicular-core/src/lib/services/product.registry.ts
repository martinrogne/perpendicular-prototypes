import { Product } from '../models/product.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[Product]] information.
 */
export abstract class IProductRegistry<ProductType extends Product = Product> extends IRegistry<ProductType> {
  /**
   * Look up all details about the product or SKU
   * @param productId the product or SKU id to look up.
   */
  public abstract getProduct(productId: string): Promise<ProductType>;

  /**
   * Look up product information based on the products/SKUs partnumber.
   */
  public abstract getProductByPartnumber(partnumber: string): Promise<ProductType>;
}
