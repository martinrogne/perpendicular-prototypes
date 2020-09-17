import { NgModule } from '@angular/core';
import { ISEORegistry } from 'perpendicular-core';
import { SEORegistry } from './seo.registry';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ISEORegistry, useClass: SEORegistry }
  ]
})
export class SEORegistryModule { }
