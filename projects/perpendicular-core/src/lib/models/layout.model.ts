import { BaseModel } from './base.model';
import { Widget } from './widget.model';
/**
 * This class represents a Layout instance, set up by business users in an external composer interface.
 * The layout defines the overall structure of a page, and the associated Cells / Slots that other widgets can be placed in.
 * This class only serves as a "name" for the layout. Specifics about which cells and slots are present are left to the
 * front end implementor to assure is in sync with the composer interface editor.
 */
export abstract class Layout extends BaseModel {
    /**
     * Layout instance id
     */
    public layoutId?: string;

    /**
     * Layout name. (i.e. "10x2", "ProductSpread", "Something Else"). Mapping this layoutname to an angular feature / component is
     * up to the front end implementors.
     */
    public layoutName = '';

    /**
     * List of widgets associated with this layout instance.
     */
    public widgets: Array<Widget> = [];
}
