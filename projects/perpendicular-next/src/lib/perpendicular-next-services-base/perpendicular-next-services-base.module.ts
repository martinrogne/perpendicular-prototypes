import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AddressService,
  AnalyticsService, CartService,
  CategoryRegistry, CategorySearchService,
  CookieService, DynamicKitConfigurationRegistry,
  ESpotService, InventoryRegistry, INVENTORYREGISTRY_CLEAR_ON_IDENTITY_CHANGE, LandingPageRegistry, LayoutService,
  MarketingEventService, NewsletterProfileService,
  NOTIFICATION_SERVICE_STABLE_DELAY,
  NotificationService, OrderHistoryService, OrderService, PaymentInstructionService, PriceRegistry,
  ProductRegistry,
  PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE,
  ProductSearchService, ProfileService, PromotionService,
  SEOPageInfoRegistry, SEORegistry,
  StoreLocationRegistry,
  StoreLocationService,
  TypeAheadService,
  UIExperimentService
} from '@perpendicular/services-base';
import {
  IAddressService,
  IAnalyticsService,
  ICartService,
  ICategoryRegistry, ICategorySearchService,
  ICookieService,
  IDynamicKitConfigurationRegistry,
  IESpotService,
  IInventoryRegistry, ILandingPageRegistry,
  ILayoutService,
  IListPriceRegistry,
  IMarketingEventService, INewsletterProfileService, INotificationService, IOrderHistoryService,
  IOrderService,
  IPaymentInstructionService, IPriceRegistry,
  IProductRegistry,
  IProductSearchService,
  IProfileService,
  IPromotionService, ISEOPageInfoRegistry,
  ISEORegistry,
  IStoreLocationRegistry,
  IStoreLocationService, ITypeAheadService,
  IUIExperimentService
} from '@perpendicular/core';



/**
 * This module set up default bindings for all general purpose (B2C) services in Perpendicular.
 */
@NgModule({
  providers: [
    // Configuration
    {
      provide: NOTIFICATION_SERVICE_STABLE_DELAY,
      useValue: 10,
    },
    {
      provide: INVENTORYREGISTRY_CLEAR_ON_IDENTITY_CHANGE,
      useValue: false,
    },
    {
      provide: PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE,
      useValue: false,
    },

    // Core requirements
    { provide: ICartService, useClass: CartService },
    { provide: IESpotService, useClass: ESpotService },
    { provide: IProductRegistry, useClass: ProductRegistry },
    { provide: IProductSearchService, useClass: ProductSearchService },
    { provide: INotificationService, useClass: NotificationService },
    { provide: IAnalyticsService, useClass: AnalyticsService },

    // Required, but seems like they should be optional
    { provide: IStoreLocationService, useClass: StoreLocationService },
    { provide: IProfileService, useClass: ProfileService },
    { provide: IPaymentInstructionService, useClass: PaymentInstructionService },
    { provide: IOrderService, useClass: OrderService },
    { provide: ICategoryRegistry, useClass: CategoryRegistry },
    { provide: ICategorySearchService, useClass: CategorySearchService },

    // Removed as non-essential
    // REMOVED: optimize // { provide: IAddressService, useClass: AddressService },
    // REMOVED: optimize // { provide: IInventoryRegistry, useClass: InventoryRegistry },
    // REMOVED: optimize // { provide: ILayoutService, useClass: LayoutService },
    // REMOVED: optimize // { provide: IMarketingEventService, useClass: MarketingEventService },
    // REMOVED: optimize // { provide: IOrderHistoryService, useClass: OrderHistoryService },
    // REMOVED: optimize // { provide: IPriceRegistry, useClass: PriceRegistry },
    // REMOVED: incorrect exported (not in index) // { provide: IListPriceRegistry, useClass: ListPriceRegistry },
    // REMOVED: optimize // { provide: IPromotionService, useClass: PromotionService },
    // REMOVED: optimize // { provide: ISEORegistry, useClass: SEORegistry },
    // REMOVED: optimize // { provide: IStoreLocationRegistry, useClass: StoreLocationRegistry },
    // REMOVED: optimize // { provide: ITypeAheadService, useClass: TypeAheadService },
    // REMOVED: optimize // { provide: INewsletterProfileService, useClass: NewsletterProfileService },
    // REMOVED: optimize //  { provide: IDynamicKitConfigurationRegistry, useClass: DynamicKitConfigurationRegistry },
    // REMOVED: optimize //  { provide: ILandingPageRegistry, useClass: LandingPageRegistry },
    // REMOVED: optimize // { provide: ICookieService, useClass: CookieService },
    // REMOVED: optimize // { provide: IUIExperimentService, useClass: UIExperimentService },
    // REMOVED: optimize // { provide: ISEOPageInfoRegistry, useClass: SEOPageInfoRegistry },
  ],
})
export class PerpendicularNextServicesBaseModule { }
