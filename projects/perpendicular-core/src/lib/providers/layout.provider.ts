import { Layout } from '../models/layout.model';

/**
 * Base interface class for fetching layout information for dynamic layouts from a backend server.
 */
export abstract class ILayoutProvider {
  /**
   * Looks up which layout to use, for a given product.
   * Use this when showing a product detail page
   *
   * @param productId the product or SKU id of the item being shown.
   * @param pageGroup the pageGroup of product, possible values Product, Item, Kit, Bundle
   */
  public abstract getLayoutByProductId(productId: string, pageGroup: string): Promise<Layout>;

  /**
   * Looks up which layout to use for a given category.
   * Use this when showing a category overview page.
   *
   * @param categoryId the category identifier of the category being shown.
   */
  public abstract getLayoutByCategoryId(categoryId: string): Promise<Layout>;

  /**
   * Looks up a layout to show, based on the current search term being submitted.
   * Can be used to have specific landing pages for certain search terms.
   *
   * @param searchTerm the term being searched for.
   */
  public abstract getLayoutBySearchTerm(searchTerm: string): Promise<Layout>;

  /**
   * Looks up a layout to show, based on the current content page being shown.
   *
   * @param pageId the page id of the page being shown.
   */
  public abstract getLayoutByPageId(pageId: string): Promise<Layout>;
}
