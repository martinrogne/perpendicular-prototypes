
import { DynamicKitConfiguration } from '../models/dynamic-kit-configuration.model';

/**
 * An abstract factory to create instances of [[DynamicKitConfiguration]]
 */
export abstract class IDynamicKitConfigurationFactory {
    /**
     * Creates a new [[DynamicKitConfiguration]]
     *
     * @param type the dynamic kit type to create a configuration item for. If unset, will return the most basic version.
     */
    public abstract newInstance(type?: string): DynamicKitConfiguration;

    /**
     * This function is responsible for preparing a concrete configuration for server side storage.
     */
    public abstract serializeToJSON(config: DynamicKitConfiguration): any;

    /**
     * Deserializes a new  [[DynamicKitConfiguration]] from a backend response from [[IDynamicKitConfigurationProvider]]
     */
    public abstract newInstanceFromJSON(id: string, json: any): DynamicKitConfiguration;
}
