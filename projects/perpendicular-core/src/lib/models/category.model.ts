import { BaseModel } from './base.model';

/**
 * This class represents a category tree section in the product catalog. Categories can be placed multiple times in the hierachy, so
 * there is no strict "parent" category. If the need arises, we can add parent categories as an variable here.
 * You can't tell from this class if its a top level category. It does not provide a back-pointer to its parent categories.
 */
export abstract class Category extends BaseModel {
  /**
   * The internal id of the category.
   */
  public id?: string;

  /**
   * The external id of the category.
   */
  public externalId?: string;

  /**
   * The name of the category in the users currently selected language.
   */
  public name = '';

  /**
   * The description of the category, in the users currently selected language.
   */
  public shortDescription = '';

  /**
   * The extended description of the category, in the users currently selected language.
   */
  public longDescription = '';

  /**
   * List of child categories associated with this category
   */
  public childCategories = [];

  /**
   * The parent category for this instance of the given category. Note, this information will only
   * be populated when created in the context of a hierarchy, such as the navigational structure,
   * and not when retrieving the category directly by ID
   */
  public parentCategory?: Category;

  /**
   * The absolute URL of the thumbnail image associated with this category.
   */
  public thumbnailImage = '';

  /**
   * The absolute URL of the full image associated with this category.
   */
  public fullImage = '';

  /**
   * The SEO slug for this category. The SEO slug will be unique within the "category" namespace only.
   * Defaults to the category id if not set.
   */
  public seotoken = '';

}
