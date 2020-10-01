import { NgModule } from '@angular/core';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class PerpendicularFactoriesWCSModule { }

// Modules
export * from './wcs-identity-factory/wcs-identity-factory.module';
export * from './wcs-product-factory/wcs-product-factory.module';
export * from './wcs-seo-token-factory/wcs-seo-token-factory.module';

// Factories
export { WCSIdentityFactory } from './wcs-identity-factory/wcs-identity.factory';
export { WCSProductFactory } from './wcs-product-factory/wcs-product.factory';
export { WCSSEOTokenFactory } from './wcs-seo-token-factory/wcs-seo-token-factory.factory';
