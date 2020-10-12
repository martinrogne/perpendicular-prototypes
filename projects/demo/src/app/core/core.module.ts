import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  getOriginHost,
  getOriginUrl,
  ICookieService,
  ORIGIN_HOST,
  ORIGIN_URL,
  PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS,
  PERPENDICULAR_HTTP,
  PRODUCTSEARCH_DEFAULT_PAGESIZE,
  PRODUCTSEARCH_SEARCHTYPE
} from 'perpendicular-core';
import { APP_CONFIG_BINDINGS } from './config';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductResolver } from './resolvers/product.resolver';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { Angulartics2Module } from 'angulartics2';
import { PrototypeCookieService } from './services/prototype-cookie-service';
import * as Sentry from '@sentry/angular';
import {
  AnalyticsServiceModule,
  CartServiceModule,
  ProductRegistryModule,
  RoutableProductSearchModule,
  SEORegistryModule,
  IdentityServiceModule,
  NotificationServiceModule,
  ProfileServiceModule
} from 'perpendicular-services-base';
import {
  PerpendicularProvidersWCSModule,
  WCSIdentityProviderModule,
  WCSProductSearchProviderModule,
  WCSSEOProviderModule,
  WCSIdentityCacheProviderModule,
  WCSCartProviderModule,
  WCSProfileProviderModule
} from 'perpendicular-providers-wcs';
import {
  WCSIdentityFactoryModule,
  WCSProductFactoryModule,
  WCSSEOTokenFactoryModule,
  WCSCartFactoryModule,
  WCSAddressFactoryModule,
  WCSPaymentInstructionFactoryModule,
  WCSShippingModeFactoryModule, WCSProfileFactoryModule, WCSPaymentMethodFactoryModule
} from 'perpendicular-factories-wcs';
import { GoogleTagManagerProviderModule } from 'perpendicular-analytics';

import {
  PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE,
  PRIVACY_POLICY_COOKIE_PREFIX,
  AUTH_COOKIE_SESSION_ONLY,
  IDENTITY_SERVICE_FETCH_ENTITLED_ORGS,
  GUEST_LOGIN_MARKETING_CONSENT,
  AUTH_COOKIE_NAME,
  MARKETING_CONSENT_COOKIE_PREFIX } from 'perpendicular-core';

@NgModule({
  providers: [
    // Prototype Perpendicular - Config
    { provide: PRODUCTSEARCH_DEFAULT_PAGESIZE, useValue: 24 },
    { provide: PRODUCTSEARCH_SEARCHTYPE, useValue: '100'},
    { provide: IDENTITY_SERVICE_FETCH_ENTITLED_ORGS, useValue: false },
    { provide: GUEST_LOGIN_MARKETING_CONSENT, useValue: false },
    { provide: AUTH_COOKIE_SESSION_ONLY, useValue: true },
    { provide: AUTH_COOKIE_NAME, useValue: 'WCAuth' },
    { provide: MARKETING_CONSENT_COOKIE_PREFIX, useValue: 'WCMarketingConsent' },
    { provide: PRIVACY_POLICY_COOKIE_PREFIX, useValue: 'WCPrivacyPolicyVersion' },
    { provide: PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE, useValue: false },

    // Prototype Perpendicular - Core
    { provide: PERPENDICULAR_HTTP, useExisting: HttpClient },
    { provide: PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS, useValue: 60 * 24 * 60 * 60 },
    { provide: ORIGIN_HOST, useFactory: getOriginHost, deps: [DOCUMENT] },
    { provide: ORIGIN_URL, useFactory: getOriginUrl, deps: [ORIGIN_HOST] },

    // Prototype services
    { provide: ICookieService, useClass: PrototypeCookieService }, // Should absolutely be optional here - no hard dependency on Cookis
  ]
})
export class PerpendicularModule {
}

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

    // Perpendicular core modules
    PerpendicularModule,

    // Perpendicular factory modules
    WCSProductFactoryModule,
    WCSIdentityFactoryModule,
    WCSSEOTokenFactoryModule,
    WCSCartFactoryModule,
    WCSAddressFactoryModule,
    WCSPaymentInstructionFactoryModule,
    WCSPaymentMethodFactoryModule,
    WCSShippingModeFactoryModule,
    WCSProfileFactoryModule,


    // Perpendicular provider modules
    PerpendicularProvidersWCSModule,
    WCSIdentityCacheProviderModule,
    WCSIdentityProviderModule,
    WCSProductSearchProviderModule,
    WCSSEOProviderModule,
    WCSCartProviderModule,
    WCSProfileProviderModule,

    // Perpendicular service modules
    CartServiceModule,
    RoutableProductSearchModule,
    AnalyticsServiceModule,
    SEORegistryModule,
    ProductRegistryModule,
    IdentityServiceModule,
    NotificationServiceModule,
    ProfileServiceModule,

    // External core module dependencies
    Angulartics2Module.forRoot(),

    // Tracking providers for Angulartics
    GoogleTagManagerProviderModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [
    // Perpendicular configuration
    ...APP_CONFIG_BINDINGS,

    // Resolvers
    { provide: ProductResolver, useClass: ProductResolver },

    // Sentry configuration
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler({ showDialog: false }) },
    { provide: Sentry.TraceService, deps: [Router] },
    { provide: APP_INITIALIZER, useFactory: () => () => {}, deps: [Sentry.TraceService], multi: true },
  ]
})
export class CoreModule { }

