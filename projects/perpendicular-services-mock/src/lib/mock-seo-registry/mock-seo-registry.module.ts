import { NgModule } from '@angular/core';
import { MockSEORegistry } from './mock-seo.registry';
import { ISEORegistry } from 'perpendicular-core';


@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ISEORegistry, useClass: MockSEORegistry }
  ]
})
export class MockSEORegistryModule { }
