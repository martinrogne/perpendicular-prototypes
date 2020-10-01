import { CategorySearchResult } from '../models/categorysearch.model';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

export abstract class ICategorySearchService<
  CategorySearchResultType extends CategorySearchResult = CategorySearchResult,
  CategoryType extends Category = Category
> {
  public abstract state: Observable<CategorySearchResultType>;

  /**
   * Utility function to find the occurances of a given category in
   * the full free, for the purposes of reconstructing one or multiple
   * paths to it
   */
  public abstract getCategoryPlacementsInHierarchy(categoryId: string): Observable<Array<CategoryType>>;
}
