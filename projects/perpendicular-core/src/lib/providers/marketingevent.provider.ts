import { MarketingContent } from '../models/marketing/marketing-content.model';

/**
 * These are all fire-and-forget messages. They update the servers internal marketing engine with
 * information about user behavior
 *
 * FIXME: This should/could be an angularetics consumer
 */
export abstract class IMarketingEventProvider {
  /**
   * Records that a customer has viewed a specific product.
   * @param productId the product or SKU that was viewed
   * @param personalizationID an identfier from the Identity class (@see Identitiy)
   */
  public abstract recordProductPageDisplay(productId: string, personalizationID: string): Promise<void>;

  /**
   * Records that a customer has viewed a specific category.
   * @param categoryId the category that was viewed
   * @param personalizationID an identfier from the Identity class (@see Identitiy)
   */
  public abstract recordCategoryPageDisplay(categoryId: string, personalizationID: string): Promise<void>;

  /**
   * Records that a customer has searched for something
   * @param searchTerm the searchterm used
   * @param personalizationID an identfier from the Identity class (@see Identitiy)
   */
  public abstract recordSearchPageDisplay(searchTerm: string, personalizationID: string): Promise<void>;

  /**
   * Records an action taken by the customer on a piece of content on the relevant spot. This is typically used to
   * indicate that the customer has actively participated with the given piece of content, and can be reflected
   * when used for A/B testing.
   *
   * @param espotId the internal, unique ID of the espot to which the content belongs.
   * @param content the marketing content that was clicked, as retrieved from the backend.
   * @param personalizationID the personalization identifier associated with the current user session,
   * which can be retrieved from the identity service.
   */
  public abstract recordContentClickFromEspot(espotId: string, content: MarketingContent, personalizationID: string): Promise<void>;
}
