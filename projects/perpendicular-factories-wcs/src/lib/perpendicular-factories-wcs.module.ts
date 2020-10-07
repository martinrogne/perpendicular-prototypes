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
export * from './wcs-cart-factory/wcs-cart-factory.module';
export * from './wcs-address-factory/wcs-address-factory.module';
export * from './wcs-payment-instruction-factory/wcs-payment-instruction-factory.module';
export * from './wcs-shipping-mode-factory/wcs-shipping-mode-factory.module';

// Factories
export { WCSIdentityFactory } from './wcs-identity-factory/wcs-identity.factory';
export { WCSProductFactory } from './wcs-product-factory/wcs-product.factory';
export { WCSSEOTokenFactory } from './wcs-seo-token-factory/wcs-seo-token-factory.factory';
export { WCSCartFactory } from './wcs-cart-factory/wcs-cart.factory';
export { WCSAddressFactory } from './wcs-address-factory/wcs-address.factory';
export { WCSPaymentInstructionFactory } from './wcs-payment-instruction-factory/wcs-payment-instruction.factory';
export { WCSShippingModeFactory } from './wcs-shipping-mode-factory/wcs-shipping-mode.factory';
