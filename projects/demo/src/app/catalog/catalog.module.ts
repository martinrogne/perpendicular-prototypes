import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPageComponent } from './search-page/search-page.component';
import { SharedModule } from './shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ProductPageComponent } from './product-page/product-page.component';
import { CategoryPageComponent } from './category-page/category-page.component';

/**
 * Module for all lazy-loaded catalog functionality
 */
@NgModule({
  declarations: [
    SearchPageComponent,
    ProductPageComponent,
    CategoryPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
  ],
})
export class CatalogModule { }
