import { NgModule } from '@angular/core';
import { WCSInterceptorsModule } from './wcsinterceptors/wcsinterceptors.module';

@NgModule({
  declarations: [],
  imports: [
    WCSInterceptorsModule
  ],
  exports: []
})
export class PerpendicularProvidersWCSModule { }

// Interceptors
export * from './wcsinterceptors/wcsinterceptors.module';

// Providers
export { WCSIdentityProviderModule } from './wcs-identity-provider/wcs-identity-provider.module';
export { WCSProductSearchProviderModule } from './wcs-product-search-provider/wcs-product-search-provider.module';
export { WCSSEOProviderModule} from './wcs-seo-provider/wcs-seo-provider.module';
export { WCSIdentityCacheProviderModule } from './wcs-identity-cache-provider/wcs-identity-cache-provider.module';
export { WCSCartProviderModule } from './wcs-cart-provider/wcs-cart-provider.module';
export { WCSProfileProviderModule } from './wcs-profile-provider/wcs-profile-provider.module';
