import { NgModule } from '@angular/core';
import { IProductRegistry, ISEORegistry } from 'perpendicular-core';
import { ProductRegistry } from './product.registry';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductRegistry, useClass: ProductRegistry }
  ]
})
export class ProductRegistryModule { }
