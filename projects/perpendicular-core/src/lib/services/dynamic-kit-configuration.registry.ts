import { DynamicKitConfiguration } from '../models/dynamic-kit-configuration.model';
import { IRegistry } from './base.registry';

/**
 * A lookup service for detailed [[DynamicKitConfiguration]] information.
 * Will cache data for repeated lookups.
 */
export abstract class IDynamicKitConfigurationRegistry<
  DynamicKitConfigurationType extends DynamicKitConfiguration = DynamicKitConfiguration
> extends IRegistry<DynamicKitConfiguration> {
  /**
   * Look up all details about the object based on its ID
   * @param orderItemId the orderItemId of the dynamic kit to load the configuration from.
   */
  public abstract getDynamicKitConfiguration(orderItemId: string): Promise<DynamicKitConfigurationType>;

  /**
   * Optionally, add additional ways of lookup up an object, by adding more getXXX functions.
   * public abstract getDynamicKitConfigurationByOtherMeans(otherParameter1: string, otherParameter2): Promise<DynamicKitConfiguration>;
   */
}
