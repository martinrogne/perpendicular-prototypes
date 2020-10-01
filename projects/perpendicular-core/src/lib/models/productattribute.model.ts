import { BaseModel } from './base.model';
import { AttributeValue } from './productattributevalue.model';
/**
 * An attribute relating to the product. Can be either 'Descriptive' (display only), or 'Defining' (required to identify variant)
 */
export class Attribute extends BaseModel {
    /**
     * Name of attribute, for display purposes.
     */
    public name = '';

    /**
     * Whether to show this attribute to the customer, or if its for logic only.
     */
    public displayable = false;

    /**
     * Whether to show this attribute in product comparisons.
     */
    public comparable = false;

    /**
     * Internal identifier of the attribute.
     */
    public identifier?: string;

    /**
     * Order in which this attribute should be shown, in relation to other attributes on the product.
     */
    public sequence = 0;

    /**
     * Indicates if this is an attribute with swatches.
     */
    public isImageAttribute = false;

    /**
     * List of values. For products, this will be the set of *used* values in all the SKUs of the product. For SKU's this will
     * typically only have 1 entry.
     */
    public values: Array<AttributeValue> = [];
}
