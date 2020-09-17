import { NgModule } from '@angular/core';
import { ICartService } from 'perpendicular-core';
import { CartService } from './cart-service.service';

/**
 * Cart service module
 */
@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: ICartService, useClass: CartService }
  ]
})
export class CartServiceModule { }
