import { NgModule } from '@angular/core';
import { ICartService } from 'perpendicular-core';
import { MockCartService } from './mock-cart.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ICartService, useClass: MockCartService }
  ]
})
export class MockCartServiceModule { }
