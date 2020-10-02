import { NgModule } from '@angular/core';
import { IProductRegistry } from 'perpendicular-core';
import { MockProductRegistry } from './mock-product.registry';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    {  provide: IProductRegistry, useClass: MockProductRegistry }
  ]
})
export class MockProductRegistryModule { }
