import { SEOPageInfo } from '../models/seo-page-info.model';
import { Injectable } from '@angular/core';

/**
 * Provider to fetch [[SeoPageInfo]] from backend systems.
 */
@Injectable()
export abstract class ISEOPageInfoProvider {
  /**
   * Fetches site seo information for a static content page
   * @param pageId Page ID of a static content page
   */
  public abstract getSeoPageInfoForContent(pageId: string): Promise<SEOPageInfo>;

  /**
   * Fetches site seo information for a category page
   * @param pageId Page ID of a category page
   */
  public abstract getSeoPageInfoForCategory(categoryId: string): Promise<SEOPageInfo>;

  /**
   * Fetches site seo information for a product page
   * @param pageId Page ID of a product page
   */
  public abstract getSeoPageInfoForProduct(productId: string): Promise<SEOPageInfo>;
}
