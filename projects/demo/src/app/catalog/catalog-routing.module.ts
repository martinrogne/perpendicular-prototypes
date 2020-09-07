import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductResolver } from '../core/resolvers/product.resolver';

/**
 * The set of routes available in the catalog feature
 */
const routes: Routes = [
  {
    path: 'search/:term',
    component: SearchPageComponent,
  },
  {
    path: 'category/:token',
    component: CategoryPageComponent,
  },
  {
    path: 'product/:token',
    component: ProductPageComponent,
    resolve: {
      product: ProductResolver,
    },
  },
];

/**
 * The module wrapping the routes
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
