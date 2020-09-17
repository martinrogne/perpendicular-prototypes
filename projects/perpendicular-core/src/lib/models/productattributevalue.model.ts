import { BaseModel } from './base.model';

/**
 * A value for an attribute. Can be a text or an image
 */
export class AttributeValue extends BaseModel {
    /**
     * Identifier for this value. Not for display.
     */
    public identifier?: string;

    /**
     * Attribute value for display purposes
     */
    public value = '';

    /**
     * Fully Qualified URL for swatch image to use, when the value is selected.
     */
    public imageurlSelected = '';

    /**
     * Fully Qualified URL for swatch image to use, when the value is unselected.
     */
    public imageurlDeselected = '';
}
