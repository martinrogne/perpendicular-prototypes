import { Injectable } from '@angular/core';
import { IShippingModeFactory, ShippingMode } from 'perpendicular-core';
import { WCSShippingMode } from 'perpendicular-models-wcs';

/**
 * A factory to deserialize static content page definitions from WebSphere Commerce.
 */
@Injectable()
export class WCSShippingModeFactory extends IShippingModeFactory {
  /**
   * Default constructor. Do not instantiate this class directly. Get it from the DI framework.
   */
  constructor() {
    super();
  }

  /**
   * Instantiates a new content page defition.
   */
  newInstance(): ShippingMode {
    const l: ShippingMode = new WCSShippingMode();
    return l;
  }

  /**
   * Instantiates a new content page definition, and deserializes the json coming from WebSphere Commerce.
   */
  newInstanceFromJSON(json: any): ShippingMode {
    const l: ShippingMode = this.composeShippingMode(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  /**
   * Extension point for overriding the default json deserialization logic.
   */
  protected composeShippingMode(json: any): ShippingMode {
    const shippingMode: ShippingMode = this.newInstance();

    shippingMode.carrier = json.carrier;
    shippingMode.description = json.shipModeDescription || json.description;
    shippingMode.shipModeCode = json.shipModeCode;
    shippingMode.id = String(json.shipModeId);
    return shippingMode;
  }
}
