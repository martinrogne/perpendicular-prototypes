import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ICookieService,
  IProductFactory,
  IProductSearchService,
  PerpendicularCoreModule,
  PRODUCTSEARCH_DEFAULT_PAGESIZE,
  PRODUCTSEARCH_SEARCHTYPE
} from '@perpendicular/core';
import { ProvidersWCSModule } from '@perpendicular/providers-wcs';
import { ServicesWCSModule } from '@perpendicular/services-wcs';
import { APP_CONFIG_BINDINGS } from './config';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesBaseModule } from '@perpendicular/services-base';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductResolver } from './resolvers/product.resolver';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrototypeRoutableProductSearchService } from './services/prototype-routable-product-search.service';
import { PrototypeProductFactory } from './factories/prototype-product.factory';
import { Angulartics2Module } from 'angulartics2';
import { PrototypeCookieService } from './services/prototype-cookie-service';
import { PerpendicularNextModule } from '../../../../perpendicular-next/src/lib/perpendicular-next.module';

/**
 * Core module, containing all root-level initialization
 */
@NgModule({
  declarations: [
    SearchBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    // Angular modules
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,

    // External core modules - Perpendicular
    // PerpendicularCoreModule,
    // ProvidersWCSModule,
    // ServicesWCSModule,
    // ServicesBaseModule,

    // Perpendicular core modules, optimized
    PerpendicularNextModule,

    // External core module dependencies
    Angulartics2Module.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    // Perpendicular configuration
    ...APP_CONFIG_BINDINGS,
    { provide: PRODUCTSEARCH_DEFAULT_PAGESIZE, useValue: 24 },
    { provide: PRODUCTSEARCH_SEARCHTYPE, useValue: '100'},

    // Resolvers
    { provide: ProductResolver, useClass: ProductResolver },

    // Prototype services
    { provide: IProductSearchService, useClass: PrototypeRoutableProductSearchService },
    { provide: ICookieService, useClass: PrototypeCookieService },

    // Prototype factories
    { provide: IProductFactory, useClass: PrototypeProductFactory },
  ]
})
export class CoreModule { }

