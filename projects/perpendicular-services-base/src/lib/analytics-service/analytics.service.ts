import { Injectable, Optional } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import {
  Cart,
  IAnalyticsService,
  IProductRegistry,
  Order,
  Product,
  MarketingContent,
  MarketingProductContent,
  ICategoryRegistry,
  MarketingCategoryContent,
  IIdentityService,
} from 'perpendicular-core';

/**
 * Service for tracking analytics event from the service layer. It should accomplish the task
 * of populating the analytics properties with the relevant fields prior to raising
 * them to angulartics.
 */
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService extends IAnalyticsService {
  /**
   * Default constructor
   */
  constructor(
    @Optional() public angulartics: Angulartics2,
    @Optional() public registry: IProductRegistry,
    @Optional() public categoryRegistry: ICategoryRegistry,
    public identityService: IIdentityService,
  ) {
    super();
    this.identityService.state.subscribe(x => {
      if (angulartics) {
        angulartics.setUsername.next(x.userId);
      }
    });
  }
  /**
   * Tracks marketing impressions for a list of marketing content, in the context of a given type of list
   */
  public trackMarketingImpressions(items: MarketingContent[], list: string): void {
    if (!this.angulartics) {
      return;
    }
    const productIds = items
      .filter((p: MarketingContent) => p instanceof MarketingProductContent && p.productId)
      .map(p => (p as MarketingProductContent).productId);
    const promos = items.filter(item => !(item instanceof MarketingProductContent));

    if (productIds.length > 0) {
      const positions = new Map<string, number>();
      productIds.forEach((productId, index) => {
        positions.set(productId as string, index);
      });
      this.trackProductImpressions(productIds as string[], list, positions);
    }
    if (promos.length > 0) {
      const promoPositions = new Map<string, number>();
      const promises = promos
        .filter(content => content instanceof MarketingCategoryContent)
        .map(content => {
          return this.categoryRegistry.getCategoryById((content as MarketingCategoryContent).categoryId as string);
        });
      promos.forEach((content, index) => {
        promoPositions.set(content.contentId as string, index);
      });
      Promise.all(promises).then(categories => {
        this.angulartics.eventTrack.next({
          action: 'PromoView',
          properties: {
            label: { promos, list, positions: promoPositions, categories },
          },
        });
      });
    }
  }

  /**
   * Tracks a click on a given marketing content, such as when the customer clicks on the image with an link
   */
  public trackMarketingContentClick(content: MarketingContent, list: string, position: number): void {
    if (!this.angulartics) {
      return;
    }
    const positions = new Map<string, number>();
    positions.set(content.contentActivityId || '', position);
    if (content instanceof MarketingProductContent) {
      this.trackProductClick(content.productId as string, list, position);
    } else if (content instanceof MarketingCategoryContent) {
      this.categoryRegistry.getCategoryById(content.categoryId as string).then(category => {
        this.angulartics.eventTrack.next({
          action: 'PromoClick',
          properties: { label: { promos: [content], categories: [category], list, positions } },
        });
      });
    } else {
      this.angulartics.eventTrack.next({
        action: 'PromoClick',
        properties: { label: { promos: [content], categories: [], list, positions } },
      });
    }
  }

  /**
   * Tracks product impressions for a list of products, in the context of a given type
   * of list
   */
  public trackProductImpressions(products: string[] | Product[], list: string, positions: Map<string, number>): void {
    if (!this.angulartics) {
      return;
    }

    const promises: Array<Promise<Product>> = new Array<Promise<Product>>();

    if (products[0] instanceof Product) {
      this.angulartics.eventTrack.next({
        action: 'ProductSummaryView',
        properties: {
          label: { products, list, positions },
        },
      });
    } else {
      for (const productId of products as string[]) {
        promises.push(this.registry.getProduct(productId));
      }

      Promise.all(promises).then(p => {
        this.angulartics.eventTrack.next({
          action: 'ProductSummaryView',
          properties: {
            label: { products: p, list, positions },
          },
        });
      });
    }
  }

  /**
   * Tracks a click on a given product, such as when the customer clicks on the product link
   */
  public trackProductClick(product: string | Product, list: string, position: number): void {
    if (!this.angulartics) {
      return;
    }

    if (product instanceof Product) {
      this.angulartics.eventTrack.next({
        action: 'ProductSummaryClick',
        properties: { label: { product, list, position } },
      });
    } else {
      this.registry.getProduct(product as string).then(p => {
        this.angulartics.eventTrack.next({
          action: 'ProductSummaryClick',
          properties: { label: { product: p, list, position } },
        });
      });
    }
  }

  /**
   * Function for tracking the display of a given product, in details level - typically
   * signifying that the customer is viewing the product page itself
   */
  public trackProductDetailsView(product: string | Product): void {
    if (!this.angulartics) {
      return;
    }

    if (product instanceof Product) {
      this.angulartics.eventTrack.next({ action: 'ProductDetailsView', properties: { label: product } });
    } else {
      this.registry.getProduct(product as string).then(p => {
        this.angulartics.eventTrack.next({ action: 'ProductDetailsView', properties: { label: p } });
      });
    }
  }

  /**
   * Function for tracking when an item with a given quantity has been added to cart
   */
  public trackAddToCart(products: string[] | Product[], quantities: number[], updatedCart: Cart): void {
    if (!this.angulartics) {
      return;
    }

    if (products[0] instanceof Product) {
      const label = {
        products,
        cart: updatedCart,
        quantities,
      };
      this.angulartics.eventTrack.next({ action: 'AddToCart', properties: { label } });
    } else {
      const promises: Array<Promise<Product>> = new Array<Promise<Product>>();

      for (const productId of products) {
        promises.push(this.registry.getProduct(productId as string));
      }

      Promise.all(promises).then(p => {
        const label = {
          products: p,
          cart: updatedCart,
          quantities,
        };
        this.angulartics.eventTrack.next({ action: 'AddToCart', properties: { label } });
      });
    }
  }

  /**
   * Function for tracking customer interaction with the various steps of the checkout
   */
  public trackCheckoutStep(step: number, option: string): void {
    this.angulartics.eventTrack.next({ action: 'CheckoutStep', properties: { label: { step, option } } });
  }

  /**
   * Function for tracking when an item has been removed from cart
   */
  public trackRemoveFromCart(product: string | Product, quantity: number, updatedCart: Cart): void {
    if (!this.angulartics) {
      return;
    }

    if (product instanceof Product) {
      const label = {
        product,
        cart: updatedCart,
        quantity,
      };
      this.angulartics.eventTrack.next({ action: 'RemoveFromCart', properties: { label } });
    } else {
      this.registry.getProduct(product).then(p => {
        const label = {
          product: p,
          cart: updatedCart,
          quantity,
        };
        this.angulartics.eventTrack.next({ action: 'RemoveFromCart', properties: { label } });
      });
    }
  }

  /**
   * Function for tracking a finalized order (an order which has been paid) for analytics
   */
  public trackFinalizedOrder(order: Order): void {
    if (this.angulartics) {
      this.angulartics.eventTrack.next({ action: 'PlaceOrder', properties: { label: order } });
    }
  }
}
