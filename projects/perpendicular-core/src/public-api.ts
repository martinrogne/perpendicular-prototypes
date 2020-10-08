/**
 * MODELS
 *
 */
export { Adjustment, AdjustmentUsageType } from './lib/models/cart/adjustment.model';
export { Address } from './lib/models/address.model';
export { CallbackResult } from './lib/models/callbackresult.model';
export { Cart } from './lib/models/cart/cart.model';
export { CartItem } from './lib/models/cart/cartitem.model';
export { CartItemAttribute } from './lib/models/cart/cartitemattribute.model';
export { CartItemComponent } from './lib/models/cart/cartitemcomponent.model';
export { Category } from './lib/models/category.model';
export { Country } from './lib/models/country.model';
export { Facet } from './lib/models/facet.model';
export { FacetValue } from './lib/models/facetvalue.model';
export { GiftItem, GiftOption } from './lib/models/cart/freegifts.model';
export { Identity } from './lib/models/identity.model';
export { Inventory } from './lib/models/inventory.model';
export { Order } from './lib/models/order.model';
export { OrderHistoryQuery, OrderHistoryResult, OrderHistorySortField, OrderHistorySortOrder } from './lib/models/order-history.model';
export { OrderItem } from './lib/models/orderitem.model';
export { OrderItemAttribute } from './lib/models/orderitemattribute.model';
export { OrderItemComponent } from './lib/models/orderitemcomponent.model';
export { PaymentMethod } from './lib/models/payment-method.model';
export { PaymentInstruction } from './lib/models/payment-instruction.model';
export { Profile } from './lib/models/profile.model';
export { Price } from './lib/models/price.model';
export { Product } from './lib/models/product.model';
export { AngleImage } from './lib/models/angleimage.model';
export { Attribute } from './lib/models/productattribute.model';
export { AttributeValue } from './lib/models/productattributevalue.model';
export { SEOToken } from './lib/models/seotoken.model';
export { ShippingMode } from './lib/models/shippingmode.model';
export { Layout } from './lib/models/layout.model';
export { Widget } from './lib/models/widget.model';
export { WidgetProperty } from './lib/models/widgetproperty.model';
export { Promotion } from './lib/models/promotion.model';
export { UIExperimentResult, UIExperimentConfig } from './lib/models/ui-experiment.model';
export { StoreLocation, StoreLocationAttribute, StoreLocationSearchResult } from './lib/models/storelocation.model';
export { Page } from './lib/models/page.model';
export { ESpot } from './lib/models/marketing/espot.model';
export { MarketingContent } from './lib/models/marketing/marketing-content.model';
export { MarketingCategoryContent } from './lib/models/marketing/marketing-category-content.model';
export { MarketingProductContent } from './lib/models/marketing/marketing-product-content.model';
export { MarketingImageContent } from './lib/models/marketing/marketing-image-content.model';
export { MarketingTextContent } from './lib/models/marketing/marketing-text-content.model';
export { MarketingAction, MarketingActionType } from './lib/models/marketing/marketing-action.model';
export { MarketingInput } from './lib/models/marketing/marketing-input.model';
export { MarketingExperiment } from './lib/models/marketing/marketing-experiment.model';
export { ProductSearchQuery, ProductSearchResult, ProductSearchSortMethod } from './lib/models/productsearch.model';
export { CategorySearchQuery, CategorySearchResult } from './lib/models/categorysearch.model';
export {
  TypeAheadQuery,
  TypeAheadResultSet,
  TypeAheadResult,
  BrandTypeAheadResult,
  ProductTypeAheadResult,
  CategoryTypeAheadResult,
  TypeAheadType,
} from './lib/models/typeahead.model';

export { NewsletterProfile, NewsletterCategory } from './lib/models/newsletterprofile.model';

/**
 * FACTORIES
 */
export { IProductFactory } from './lib/factories/product.factory';
export { ICategoryFactory } from './lib/factories/category.factory';
export { ILayoutFactory } from './lib/factories/layout.factory';
export { IPromotionFactory } from './lib/factories/promotion.factory';
export { IStoreLocationFactory } from './lib/factories/storelocation.factory';
export { IPageFactory } from './lib/factories/page.factory';
export { IShippingModeFactory } from './lib/factories/shippingmode.factory';
export { IPaymentMethodFactory } from './lib/factories/payment-method.factory';
export { IProfileFactory } from './lib/factories/profile.factory';
export { IAddressFactory } from './lib/factories/address.factory';
export { ICartFactory } from './lib/factories/cart.factory';
export { IPaymentInstructionFactory } from './lib/factories/payment-instruction.factory';
export { IOrderFactory } from './lib/factories/order.factory';
export { IESpotFactory } from './lib/factories/espot.factory';
export { ITypeAheadFactory } from './lib/factories/typeahead.factory';
export { INewsletterProfileFactory } from './lib/factories/newsletterprofile.factory';
export { IUIExperimentFactory } from './lib/factories/ui-experiment.factory';

/**
 * PROVIDERS
 */
export { ICartProvider } from './lib/providers/cart.provider';
export { ICategorySearchProvider } from './lib/providers/categorysearch.provider';
export { ICountryProvider } from './lib/providers/country.provider';
export { IESpotProvider } from './lib/providers/espot.provider';
export { IIdentityProvider } from './lib/providers/identity.provider';
export { IIdentityCacheProvider } from './lib/providers/identitycache.provider';
export { IInventoryProvider } from './lib/providers/inventory.provider';
export { IMarketingEventProvider } from './lib/providers/marketingevent.provider';
export { IOrderProvider } from './lib/providers/order.provider';
export { IPaymentInstructionProvider } from './lib/providers/payment-instruction.provider';
export { IProfileProvider } from './lib/providers/profile.provider';
export { IPriceProvider } from './lib/providers/price.provider';
export { IProductSearchProvider } from './lib/providers/productsearch.provider';
export { ISEOProvider } from './lib/providers/seo.provider';
export { ILayoutProvider } from './lib/providers/layout.provider';
export { IPromotionProvider } from './lib/providers/promotion.provider';
export { IStoreLocationProvider } from './lib/providers/storelocation.provider';
export { IPageProvider } from './lib/providers/page.provider';
export { ITypeAheadProvider } from './lib/providers/typeahead.provider';
export { INewsletterProfileProvider } from './lib/providers/newsletterprofile.provider';
export { IUIExperimentProvider } from './lib/providers/ui-experiment.provider';

/**
 * SERVICES
 */
export { CountryList, IAddressService } from './lib/services/address.service';
export { ICartService } from './lib/services/cart.service';
export { ICategorySearchService } from './lib/services/categorysearch.service';
export { IESpotService } from './lib/services/espot.service';
export { IIdentityService } from './lib/services/identity.service';
export { IMarketingEventService } from './lib/services/marketingevent.service';
export { UIMessage, INotificationService, UIMessageType } from './lib/services/notification.service';
export { IOrderService } from './lib/services/order.service';
export { IOrderHistoryService } from './lib/services/orderhistory.service';
export { IPaymentInstructionService } from './lib/services/payment-instruction.service';
export { IProfileService } from './lib/services/profile.service';
export { IProductSearchService } from './lib/services/productsearch.service';
export { ILayoutService } from './lib/services/layout.service';
export { IPromotionService } from './lib/services/promotion.service';
export { IStoreLocationService } from './lib/services/storelocation.service';
export { ITypeAheadService } from './lib/services/typeahead.service';
export { INewsletterProfileService } from './lib/services/newsletterprofile.service';
export { IAnalyticsService } from './lib/services/analytics.service';
export { ICookieService } from './lib/services/cookie.service';
export { IUIExperimentService } from './lib/services/ui-experiment.service';

/**
 * REGISTRIES
 */
export { IRegistry } from './lib/services/base.registry';
export { IStoreLocationRegistry } from './lib/services/storelocation.registry';
export { ICategoryRegistry } from './lib/services/category.registry';
export { IPriceRegistry } from './lib/services/price.registry';
export { IListPriceRegistry } from './lib/services/listprice.registry';
export { IInventoryRegistry } from './lib/services/inventory.registry';
export { IProductRegistry } from './lib/services/product.registry';
export { ISEORegistry } from './lib/services/seo.registry';

/**
 * DI Tokens.
 * This module is mandatory to import. It sets up all the globally required
 * injectionable options for Perpendicular.
 */
import { DynamicKitConfiguration } from './lib/models/dynamic-kit-configuration.model';
import { IDynamicKitConfigurationFactory } from './lib/factories/dynamic-kit-configuration.factory';
import { IDynamicKitConfigurationRegistry } from './lib/services/dynamic-kit-configuration.registry';
import { IDynamicKitConfigurationProvider } from './lib/providers/dynamic-kit-configuration.provider';
import { RequisitionList } from './lib/models/requisition-list.model';
import { IRequisitionListFactory } from './lib/factories/requisition-list.factory';
import { IRequisitionListRegistry } from './lib/services/requisition-list.registry';
import { IRequisitionListProvider } from './lib/providers/requisition-list.provider';
import { IRequisitionListService } from './lib/services/requisition-list.service';
import { RequisitionListItem } from './lib/models/requisition-list-item.model';
import { RequisitionListSearchResult } from './lib/models/requisition-list-search-result.model';
import { RequisitionListSearchQuery } from './lib/models/requisition-list-search-query.model';
import { IProfileRegistry } from './lib/services/profile.registry';
import { Organization } from './lib/models/organization.model';
import { IOrganizationFactory } from './lib/factories/organization.factory';
import { IOrganizationRegistry } from './lib/services/organization.registry';
import { IOrganizationProvider } from './lib/providers/organization.provider';
import { IOrganizationSearchService } from './lib/services/organization-search.service';
import { OrganizationSearchQuery, OrganizationSearchResult } from './lib/models/organization-search.model';
import { UserAccount } from './lib/models/user-account.model';
import { IUserAccountFactory } from './lib/factories/user-account.factory';
import { IUserAccountRegistry } from './lib/services/user-account.registry';
import { IUserAccountProvider } from './lib/providers/user-account.provider';
import { IUserAccountSearchService } from './lib/services/user-account-search.service';
import { UserAccountSearchQuery, UserAccountSearchResult, UserAccountSortBy } from './lib/models/user-account-search.model';
import { Role } from './lib/models/role.model';
import { IRoleFactory } from './lib/factories/role.factory';
import { IOrderSearchService } from './lib/services/order-search.service';
import { OrderSearchQuery, OrderSearchResult, OrderSearchSortBy } from './lib/models/order-search.model';
import { LandingPage } from './lib/models/landing-page.model';
import { ILandingPageFactory } from './lib/factories/landing-page.factory';
import { ILandingPageRegistry } from './lib/services/landing-page.registry';
import { ILandingPageProvider } from './lib/providers/landing-page.provider';
import { IPriceFactory } from './lib/factories/price.factory';
import { ISEOTokenFactory } from './lib/factories/seotoken.factory';
import { IPaymentCallbackFactoryFactory } from './lib/factories/payment-callback.factory';
import { IIdentityFactory } from './lib/factories/identity.factory';
import { Attachment } from './lib/models/attachment.model';
import { IAttachmentFactory } from './lib/factories/attachment.factory';
import { IOrderHistoryFactory } from './lib/factories/order-history.factory';
import { IOrderHistoryProvider } from './lib/providers/order-history.provider';
import { SEOPageInfo } from './lib/models/seo-page-info.model';
import { ISEOPageInfoFactory } from './lib/factories/seo-page-info.factory';
import { ISEOPageInfoRegistry } from './lib/services/seo-page-info.registry';
import { ISEOPageInfoProvider } from './lib/providers/seo-page-info.provider';
import { ISEOMetaDataService } from './lib/services/seometa-data.service';
import { WindowRef } from './lib/util/window-ref';

export * from './lib/tokens';

export { DynamicKitConfiguration } from './lib/models/dynamic-kit-configuration.model';
export { IDynamicKitConfigurationFactory } from './lib/factories/dynamic-kit-configuration.factory';
export { IDynamicKitConfigurationRegistry } from './lib/services/dynamic-kit-configuration.registry';
export { IDynamicKitConfigurationProvider } from './lib/providers/dynamic-kit-configuration.provider';
export { RequisitionList } from './lib/models/requisition-list.model';
export { IRequisitionListFactory } from './lib/factories/requisition-list.factory';
export { IRequisitionListRegistry } from './lib/services/requisition-list.registry';
export { IRequisitionListProvider } from './lib/providers/requisition-list.provider';
export { IRequisitionListService } from './lib/services/requisition-list.service';
export { RequisitionListItem } from './lib/models/requisition-list-item.model';
export { RequisitionListSearchResult } from './lib/models/requisition-list-search-result.model';
export { RequisitionListSearchQuery, RequsitionListSearchSortType } from './lib/models/requisition-list-search-query.model';
export { IProfileRegistry } from './lib/services/profile.registry';
export { Organization } from './lib/models/organization.model';
export { IOrganizationFactory } from './lib/factories/organization.factory';
export { IOrganizationRegistry } from './lib/services/organization.registry';
export { IOrganizationProvider } from './lib/providers/organization.provider';
export { IOrganizationSearchService } from './lib/services/organization-search.service';
export { OrganizationSearchResult, OrganizationSearchQuery } from './lib/models/organization-search.model';
export { BaseSearchQuery, BaseSearchResult } from './lib/models/base.search.model';
export { ISearchProvider } from './lib/providers/base.search.provider';
export { ISearchService } from './lib/services/base.search.service';
export { ISearchFactory, IFactory } from './lib/factories/base.factory';
export { UserAccount } from './lib/models/user-account.model';
export { IUserAccountFactory } from './lib/factories/user-account.factory';
export { IUserAccountRegistry } from './lib/services/user-account.registry';
export { IUserAccountProvider } from './lib/providers/user-account.provider';
export { IUserAccountSearchService } from './lib/services/user-account-search.service';
export { UserAccountSortBy, UserAccountSearchQuery, UserAccountSearchResult } from './lib/models/user-account-search.model';
export { Role } from './lib/models/role.model';
export { IRoleFactory } from './lib/factories/role.factory';
export { IOrderSearchService } from './lib/services/order-search.service';
export { OrderSearchQuery, OrderSearchResult, OrderSearchSortBy } from './lib/models/order-search.model';

export { bufferTimeReactive } from './lib/util/bufferTimeReactive';
export { WindowRef } from './lib/util/window-ref';
export { OnInputChange } from './lib/util/on-input-change-decorator';

export { LandingPage } from './lib/models/landing-page.model';
export { ILandingPageFactory } from './lib/factories/landing-page.factory';
export { ILandingPageRegistry } from './lib/services/landing-page.registry';
export { ILandingPageProvider } from './lib/providers/landing-page.provider';
export { IInventoryFactory } from './lib/factories/inventory.factory';
export { IPriceFactory } from './lib/factories/price.factory';
export { ISEOTokenFactory } from './lib/factories/seotoken.factory';
export { IPaymentCallbackFactoryFactory } from './lib/factories/payment-callback.factory';
export { IIdentityFactory } from './lib/factories/identity.factory';
export { Attachment } from './lib/models/attachment.model';
export { IAttachmentFactory } from './lib/factories/attachment.factory';
export { IOrderHistoryFactory } from './lib/factories/order-history.factory';
export { IOrderHistoryProvider } from './lib/providers/order-history.provider';
export { SEOPageInfo } from './lib/models/seo-page-info.model';
export { ISEOPageInfoFactory } from './lib/factories/seo-page-info.factory';
export { ISEOPageInfoRegistry } from './lib/services/seo-page-info.registry';
export { ISEOPageInfoProvider } from './lib/providers/seo-page-info.provider';
export { ISEOMetaDataService } from './lib/services/seometa-data.service';


/**
 * Configuration objecft
 */
export { ProvidersWCSConfig } from './lib/util/config';

/**
 * returns the hostname from which the page was loaded.
 */
export function getOriginHost(document: any): string {
  let originHost = '';
  if (document && document.location) {
    originHost = document.location.hostname;
  }
  return originHost;
}

export function getOriginUrl(originHost: string): string {
  return 'https://' + originHost;
}
