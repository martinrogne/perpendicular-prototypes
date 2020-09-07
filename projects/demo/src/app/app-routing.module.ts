import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * The set of routes available from the root scope
 */
const routes: Routes = [
  {
    path: 'catalog',
    loadChildren: () => import('./catalog/catalog.module').then(m => m.CatalogModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
  }
];

/**
 * The module wrapping the routes
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
