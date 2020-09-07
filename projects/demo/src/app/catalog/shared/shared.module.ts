import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { RouterModule } from '@angular/router';
import { PageSizeComponent } from './page-size/page-size.component';
import { SortingComponent } from './sorting/sorting.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FacetsComponent } from './facets/facets.component';
import { DirectivesModule } from '../../directives/directives.module';

/**
 * Shared module for catalog functionality
 */
@NgModule({
  declarations: [
    ProductGridComponent,
    ProductTileComponent,
    PageSizeComponent,
    SortingComponent,
    PaginationComponent,
    FacetsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule
  ],
  exports: [
    ProductGridComponent,
    ProductTileComponent,
    PageSizeComponent,
    SortingComponent,
    PaginationComponent,
    FacetsComponent
  ]
})
export class SharedModule { }
