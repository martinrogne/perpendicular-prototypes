import { Product } from '../models/product.model';
import { Cart } from '../models/cart/cart.model';
import { Order } from '../models/order.model';
import { MarketingContent } from '../models/marketing/marketing-content.model';

/**
 * Service for tracking analytics event from the service layer. It should accomplish the task
 * of populating the analytics properties with the relevant fields prior to raising
 * them to angulartics.
 */
export abstract class IAnalyticsService {
  /**
   * Tracks marketing impressions for a list of marketing content, in the context of a given type of list
   */
  public abstract trackMarketingImpressions(items: MarketingContent[], list: string): void;
  /**
   * Tracks a click on a given marketing content, such as when the customer clicks on the image with an link
   */
  public abstract trackMarketingContentClick(content: MarketingContent, list: string, position: number): void;
  /**
   * Tracks product impressions for a list of products, in the context of a given type
   * of list
   * @param positions Map<string, number> - a map from the ID of the product to the relative position within the list
   */
  public abstract trackProductImpressions(productIds: string[] | Product[], list: string, positions: Map<string, number>): void;

  /**
   * Tracks a click on a given product, such as when the customer clicks on the product link
   */
  public abstract trackProductClick(productId: string | Product, list: string, position: number): void;

  /**
   * Function for tracking the display of a given product, in details level - typically
   * signifying that the customer is viewing the product page itself
   */
  public abstract trackProductDetailsView(productId: string | Product): void;

  /**
   * Function for tracking when an item with a given quantity has been added to cart
   */
  public abstract trackAddToCart(productId: string[] | Product[], quantity: number[], updatedCart: Cart): void;

  /**
   * Function for tracking when an item has been removed from cart
   */
  public abstract trackRemoveFromCart(productId: string | Product, quantity: number, updatedCart: Cart): void;

  /**
   * Function for tracking a step in checkout
   */
  public abstract trackCheckoutStep(step: number, option: string): void;

  /**
   * Function for tracking a finalized order (an order which has been paid) for analytics
   */
  public abstract trackFinalizedOrder(order: Order): void;
}
