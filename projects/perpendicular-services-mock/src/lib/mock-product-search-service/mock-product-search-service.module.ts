import { NgModule } from '@angular/core';
import { MockProductSearchService } from './mock-product-search.service';
import { IProductSearchService } from 'perpendicular-core';


@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProductSearchService, useClass: MockProductSearchService }
  ]
})
export class MockProductSearchServiceModule { }
