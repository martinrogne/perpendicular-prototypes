import { NgModule } from '@angular/core';
import { IProductSearchService } from 'perpendicular-core';
import { ProductSearchService } from './product-search/product-search.service';
import { RoutableProductSearchService } from './routable-product-search/routable-product-search.service';

export { ProductSearchService } from './product-search/product-search.service';
export { RoutableProductSearchService } from './routable-product-search/routable-product-search.service';

/**
 * Product search feature module
 */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductSearchService, useClass: ProductSearchService }
  ]
})
export class ProductSearchModule { }

/**
 * Routable product search feature module
 */
@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductSearchService, useClass: RoutableProductSearchService }
  ]
})
export class RoutableProductSearchModule { }

