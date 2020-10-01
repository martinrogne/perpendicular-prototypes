import { BaseModel } from './base.model';
import { WidgetProperty } from './widgetproperty.model';

/**
 * This class represents a "Smart" component (angular2 terminology), placed on a layout by a business user in an external Composer
 * interface. The translation between widget name, and angular2 names are up to the consumer of this service.
 */
export class Widget extends BaseModel {
  /**
   * internal id of the definition of the widget (the "class" if you will)
   */
  public widgetDefinitionId?: string;

  /**
   * internal id of the *instance* of the widget
   */
  public widgetId?: string;

  /**
   * External identifier of the widget definition, signifying the class of widget
   */
  public widgetDefinitionIdentifier?: string;

  /**
   * Name of this widget instance
   */
  public name = '';

  /**
   * The order of the widget within a layout cell.
   */
  public sequence = 0;

  /**
   * The cell to render the widget in. The semantics are defined only by the team defining the layouts.
   */
  public slotId = 0;

  /**
   * Any properties associated with this widget instance.
   */
  public properties: Array<WidgetProperty> = [];

  /**
   * Any child widgets to be placed inside this widget.
   */
  public childWidgets?: Array<Widget> = [];
}
