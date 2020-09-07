import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

/**
 * The set of routes available in the checkout feature
 */
const routes: Routes = [
  {
    path: '',
    component: CheckoutPageComponent,
  }
];

/**
 * The module wrapping the routes
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
