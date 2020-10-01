import { TypeAheadResultSet, TypeAheadType } from '../models/typeahead.model';
import { Observable } from 'rxjs';

export abstract class ITypeAheadService {
  /**
   * The result
   */
  public abstract state: Observable<TypeAheadResultSet>;

  /**
   * The search term to search for
   */
  public abstract searchTerm: string;

  /**
   * Sets which types of suggestions to return. Does not re-run query, as this is only supposed to happen
   * in the setup phase
   */
  public abstract suggestionTypes: TypeAheadType[];
}
