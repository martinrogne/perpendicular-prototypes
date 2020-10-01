import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { IAnalyticsService, IProductRegistry, ISEORegistry, Product } from 'perpendicular-core';

/**
 * Resolver for mapping a product SEO token on the URL to a valid product
 * on the route data
 */
@Injectable()
export class ProductResolver implements Resolve<Product> {
  /**
   * Default constructor
   */
  constructor(private seoRegistry: ISEORegistry,
              private productRegistry: IProductRegistry,
              private analyticsService: IAnalyticsService) {}

  /**
   * Main resolver implementation
   */
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product> {
    return this.seoRegistry.getSEOToken(route.params.token).then(x => {
      const productId = String(x.tokenValue);
      const promise = this.productRegistry.getProduct(productId);

      promise.then(p => {
        this.analyticsService.trackProductDetailsView(p);
      });

      return promise;
    });
  }
}
