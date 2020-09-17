import { MarketingContent } from '../models/marketing/marketing-content.model';

export abstract class IMarketingEventService {
  /**
   * Notify statistics engine that a product was prominently displayed
   */
  public abstract recordProductPageDisplay(productId: string): Promise<void>;

  /**
   * Notify statistics engine that a category was prominently displayed
   */
  public abstract recordCategoryPageDisplay(categoryId: string): Promise<void>;

  /**
   * Records a search page view
   *
   * @param searchTerm the search term used on this page.
   */
  public abstract recordSearchPageDisplay(searchTerm: string): Promise<void>;

  /**
   * Notify statistics engine that someone clicked a content link from a marketing spot
   */
  public abstract recordContentClickFromEspot(espotId: string, content: MarketingContent): Promise<void>;
}
