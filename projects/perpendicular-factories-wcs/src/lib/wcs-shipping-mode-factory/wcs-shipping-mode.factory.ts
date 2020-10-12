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
  public newInstance(): ShippingMode {
    const l: ShippingMode = new WCSShippingMode();
    return l;
  }

  /**
   * Instantiates a new content page definition, and deserializes the json coming from WebSphere Commerce.
   */
  public newInstanceFromJSON(json: any): ShippingMode {
    const l: ShippingMode = this.composeShippingMode(json);

    // We may actually want to freeze objects at the individual composition steps (deep freezing)
    return Object.freeze(l);
  }

  public newInstancesFromJSON(json: any): Array<ShippingMode> {
    const result = new Array<ShippingMode>();
    // if server returns pr item shipping modes, just pick one.
    if (!!json.orderItem) {
      for (const itemIdx in json.orderItem) {
        if (!json.orderItem.hasOwnProperty(itemIdx)) {
          continue;
        }
        const usableShippingModes = json.orderItem[itemIdx];
        for (const shipModeIdx in usableShippingModes.usableShippingMode) {
          if (!usableShippingModes.usableShippingMode.hasOwnProperty(shipModeIdx)) {
            continue;
          }

          const usableShippingMode = usableShippingModes.usableShippingMode[shipModeIdx];
          result.push(this.newInstanceFromJSON(usableShippingMode));
        }
        // we only inspect the first order items result.
        break;
      }
    } else {
      // otherwise, if the server returns shared shipping modes, pick that.
      for (const shipModeIdx in json.usableShippingMode) {
        if (!json.usableShippingMode.hasOwnProperty(shipModeIdx)) {
          continue;
        }

        const usableShippingMode = json.usableShippingMode[shipModeIdx];
        result.push(this.newInstanceFromJSON(usableShippingMode));
      }
    }
    return result;
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
