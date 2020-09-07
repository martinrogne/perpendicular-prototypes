import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { ProductTileComponent } from './product-tile/product-tile.component';
import { RouterModule } from '@angular/router';
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
    PaginationComponent,
    FacetsComponent
  ]
})
export class SharedModule { }
