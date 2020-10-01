import { BaseModel } from './base.model';

/**
 * This class represents a property on a widget. Properties are set by Business Users in an external Composer interface.
 */
export class WidgetProperty extends BaseModel {
    /**
     * name of property
     */
    public name = '';

    /**
     * Value of property
     */
    public value = '';

    /**
     * In case of multiple properties with same name, the sequence can be used to determine correct order to process them in.
     */
    public sequence = 0;
}
