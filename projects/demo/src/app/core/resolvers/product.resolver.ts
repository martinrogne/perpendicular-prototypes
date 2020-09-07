import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IProductRegistry, ISEORegistry, Product } from '@perpendicular/core';

/**
 * Resolver for mapping a product SEO token on the URL to a valid product
 * on the route data
 */
@Injectable()
export class ProductResolver implements Resolve<Product> {
  /**
   * Default constructor
   */
  constructor(private seoRegistry: ISEORegistry, private productRegistry: IProductRegistry) {}

  /**
   * Main resolver implementation
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product> {
    return this.seoRegistry.getSEOToken(route.params.token).then(x => {
      const productId = String(x.tokenValue);
      return this.productRegistry.getProduct(productId);
    });
  }
}
