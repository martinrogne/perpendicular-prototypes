import { BaseModel } from './base.model';
import { Category } from './category.model';
import { Product } from './product.model';

/**
 * Enum to define what kind of type-ahead (autosuggestions) you want
 * to get back. Custom types can be added from value 100.
 */
export enum TypeAheadType {
    KEYWORD = 0,
    CATEGORY,
    PRODUCT,
    BRAND,
    CONTENT,
}
/**
 * The most basic type ahead result. Typically a keyword that can be search for.
 */
export class TypeAheadResult extends BaseModel {
    /**
     * The value that the typeahead service returned as a potential result
     */
    public displayValue = '';
}

/**
 * A specialized typeahead result for those results that come from the available categories.
 * Contains the category to build direct routing based on this result.
 */
export class CategoryTypeAheadResult extends TypeAheadResult {
    /**
     * The categoryid that this result points to.
     */
    public categoryId?: string;
}

/**
 * A specialized typeahead result for those results that come from brands.
 */
export class BrandTypeAheadResult extends TypeAheadResult {
    /**
     * The facet value that can be applied to the ProductSearchRegistry to limit
     * product search to only products from this manufacturer.
     */
    public facetValue?: string;
}

/**
 * A specialized typeahead result for those results that come from products.
 */
export class ProductTypeAheadResult extends TypeAheadResult {
    /**
     * A non-complete Product object that contains at least Name, description, productId, seotoken and thumbnailImage.
     * NOTE: This product is not as filled out as one gotten from the ProductRegistry.
     */
    public product?: Product;
}

/**
 * Represents a set of type-ahead results from the backend.
 * Type-ahead results are grouped into sets of results, to allow front end to display them grouped, or
 * optionally to provide customized rendering of each type. For instance, a product-name result might be rendered
 * as the full product (with image), or as a direct link to the product display page.
 *
 *
 */
export class TypeAheadResultSet {
    /**
     * The set of results. Will always be non-null. The type refers to the TypeAheadType enum, but
     * typescript does not allow using enums as types for map-indexes (yet?)
     */
    public results: { [type: number]: Array<TypeAheadResult> } = {};
}

/**
 * The query class used by the service to communicate with the provider layer.
 */
export class TypeAheadQuery {
    /**
     * List of types to search in the backend. Defaults to TYPEAHEAD_KEYWORD.
     */
    public types: TypeAheadType[] = new Array<TypeAheadType>();
    public searchTerm = '';

    /**
     * Default constructor
     */
    constructor() {
        this.types.push(TypeAheadType.KEYWORD);
    }
}
