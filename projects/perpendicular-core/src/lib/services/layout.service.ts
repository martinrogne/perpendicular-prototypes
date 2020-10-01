import { Product } from '../models/product.model';
import { Layout } from '../models/layout.model';
import { Page } from '../models/page.model';

/**
 * UI Layout Service. Use this to look up dynamic layout configurations based on these 4 scenarios
 * 1) When showing a product detail page
 * 2) When showing a category overview page
 * 3) When checking to see if a specific search term maps to a content page
 * 4) When showing a content page
 */
export abstract class ILayoutService<LayoutType extends Layout = Layout, PageType extends Page = Page> {
  /**
   * Looks up which layout to use, for a given product.
   * Use this when showing a product detail page
   *
   * @param product the product being shown.
   */
  public abstract getLayoutByProduct(product: Product): Promise<LayoutType>;

  /**
   * Looks up which layout to use for a given category.
   * Use this when showing a category overview page.
   *
   * @param categoryId the category identifier of the category being shown.
   */
  public abstract getLayoutByCategoryId(categoryId: string): Promise<LayoutType>;

  /**
   * Looks up a layout to show, based on the current search term being submitted.
   * Can be used to have specific landing pages for certain search terms.
   *
   * @param searchTerm the term being searched for.
   */
  public abstract getLayoutBySearchTerm(searchTerm: string): Promise<LayoutType>;

  /**
   * Looks up a layout to show, based on the current content page being shown.
   *
   * @param pageId the page id of the page being shown.
   */
  public abstract getLayoutByPageId(pageId: string): Promise<LayoutType>;

  /**
   * Looks up a pageId based on its Page name, like
   * - HelpPage
   * - ContactUsPage
   */
  public abstract getPageByPageName(pageName: string): Promise<PageType>;
}
