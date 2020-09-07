import { NgModule } from '@angular/core';
import { APP_BASE_HREF, CommonModule, DOCUMENT } from '@angular/common';
import {
  getOriginHost, getOriginUrl,
  IAddressFactory, IAnalyticsService,
  IAttachmentFactory,
  ICartFactory,
  ICartProvider,
  ICartService,
  ICategoryFactory, ICategoryRegistry,
  ICategorySearchProvider,
  ICookieService,
  IDynamicKitConfigurationFactory,
  IIdentityCacheProvider,
  IIdentityFactory,
  IIdentityProvider,
  IIdentityService,
  INotificationService,
  IOrderFactory,
  IOrderHistoryFactory,
  IOrderHistoryProvider,
  IOrderProvider,
  IOrderService,
  IOrganizationFactory,
  IPaymentCallbackFactoryFactory,
  IPaymentInstructionFactory,
  IPaymentInstructionProvider,
  IPaymentInstructionService,
  IPaymentMethodFactory,
  IProductFactory,
  IProductRegistry,
  IProductSearchProvider,
  IProductSearchService,
  IProfileFactory,
  IProfileProvider,
  IProfileService,
  IRoleFactory,
  ISEOProvider,
  ISEOTokenFactory,
  IShippingModeFactory,
  IStoreLocationFactory,
  IStoreLocationProvider,
  IStoreLocationService, ORIGIN_HOST, ORIGIN_URL, PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS, PERPENDICULAR_HTTP,
  PerpendicularCoreModule,
  PRODUCTSEARCH_DEFAULT_PAGESIZE,
  PRODUCTSEARCH_SEARCHTYPE, WindowRef
} from '@perpendicular/core';
import {
  AbstractDriver,
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_SESSION_ONLY,
  BaseWCSDriver,
  CookieBasedIdentityCacheProvider,
  GUEST_LOGIN_MARKETING_CONSENT,
  MARKETING_CONSENT_COOKIE_PREFIX, PRIVACY_POLICY_COOKIE_PREFIX,
  ProvidersWCSConfig,
  ProvidersWCSModule,
  WCSAddressFactory,
  WCSAttachmentFactory,
  WCSCartFactory,
  WCSCartProvider, WCSCategoryFactory, WCSCategorySearchProvider,
  WCSDriver, WCSDynamicKitConfigurationFactory,
  WCSIdentityFactory,
  WCSIdentityProvider, WCSOrderFactory, WCSOrderHistoryFactory, WCSOrderHistoryProvider, WCSOrderProvider,
  WCSOrganizationFactory, WCSPaymentCallbackFactoryFactory, WCSPaymentInstructionFactory, WCSPaymentInstructionProvider,
  WCSPaymentMethodFactory,
  WCSProductSearchProvider, WCSProfileFactory, WCSProfileProvider,
  WCSRoleFactory,
  WCSSEOProvider, WCSSEOTokenFactory,
  WCSShippingModeFactory, WCSStoreLocationFactory, WCSStoreLocationProvider
} from '@perpendicular/providers-wcs';
import { IDENTITY_SERVICE_FETCH_ENTITLED_ORGS, IdentityService, ServicesWCSModule } from '@perpendicular/services-wcs';
import { APP_CONFIG_BINDINGS } from './config';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  AnalyticsService,
  CartService, CategoryRegistry,
  CookieService, INVENTORYREGISTRY_CLEAR_ON_IDENTITY_CHANGE,
  NOTIFICATION_SERVICE_STABLE_DELAY,
  NotificationService, OrderService, PaymentInstructionService,
  ProductRegistry, PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE, ProfileService,
  ServicesBaseModule, StoreLocationService
} from '@perpendicular/services-base';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductResolver } from './resolvers/product.resolver';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PrototypeRoutableProductSearchService } from './services/prototype-routable-product-search.service';
import { PrototypeProductFactory } from './factories/prototype-product.factory';
import { Angulartics2Module } from 'angulartics2';

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
    PerpendicularCoreModule,
    ProvidersWCSModule,
    ServicesWCSModule,
    ServicesBaseModule,

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
    { provide: APP_BASE_HREF, useValue: '/', },
    { provide: PRODUCTSEARCH_DEFAULT_PAGESIZE, useValue: 24 },
    { provide: PRODUCTSEARCH_SEARCHTYPE, useValue: '100'},

    // Resolvers
    { provide: ProductResolver, useClass: ProductResolver },

    // Prototype services
    { provide: IProductSearchService, useClass: PrototypeRoutableProductSearchService },

    // Prototype factories
    { provide: IProductFactory, useClass: PrototypeProductFactory },
  ]
})
export class CoreModule { }

