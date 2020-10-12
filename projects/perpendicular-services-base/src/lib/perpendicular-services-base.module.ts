import { NgModule } from '@angular/core';

/**
 * Root module. This should be kept empty, aside from things that are absolutely
 * core to the services base (required by all of them)
 */
@NgModule({
  declarations: [],
  imports: [
  ],
  exports: []
})
export class PerpendicularServicesBaseModule { }

/**
 * Export the individual modules for consumption
 */
export * from './cart-service/cart-service.module';
export * from './product-search/product-search.module';
export * from './analytics-service/analytics-service.module';
export * from './product-registry/product-registry.module';
export * from './seo-registry/seo-registry.module';
export * from './identity-service/identity-service.module';
export * from './notification-service/notification-service.module';
export * from './profile-service/profile-service.module';
export * from './cookie-service/cookie-service.module';
