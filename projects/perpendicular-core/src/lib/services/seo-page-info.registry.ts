import { SEOPageInfo } from '../models/seo-page-info.model';
import { Injectable } from '@angular/core';
import { IRegistry } from './base.registry';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';

/**
 * A lookup service for detailed [[SEOPageInfo]] information.
 *
 * SEOPageInfo is used to populate the meta-description areas and JSON+LD areas in the header of the page.
 * Most useful for Server Side rendering, but typically also maintained in browser based renditions, for easier debugging.
 *
 * Will cache data for repeated lookups.
 */
@Injectable()
export abstract class ISEOPageInfoRegistry<SEOPageInfoType extends SEOPageInfo = SEOPageInfo> extends IRegistry<SEOPageInfoType> {
  /**
   * Look up all details about the object based on its ID. Use this for content pages
   * @param id the id of the object to find.
   */
  public abstract getSeoPageInfoForContentPage(id: string): Promise<SEOPageInfoType>;

  /**
   * Look up seo page information for a specific product
   */
  public abstract getSeoPageInfoForProduct(p: Product): Promise<SEOPageInfoType>;

  /**
   * Look up seo page information for a specific category
   */
  public abstract getSeoPageInfoForCategory(c: Category): Promise<SEOPageInfoType>;
}
