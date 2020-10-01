import { Category } from '../models/category.model';
import { IRegistry } from './base.registry';

/**
 * Non-stateful UI service to look up basic information about a category.
 */
export abstract class ICategoryRegistry<CategoryType extends Category = Category> extends IRegistry<CategoryType> {
  /**
   * Returns the category by looking it up by categoryId.
   *
   * @param categoryId the categoryId to find
   */
  public abstract getCategoryById(categoryId: string): Promise<CategoryType>;

  /**
   * Returns the category by looking it up by identifier. This is the external
   * id.
   *
   * @param identifier the identifier to find
   */
  public abstract getCategoryByExternalIdentifier(identifier: string): Promise<CategoryType>;
}
