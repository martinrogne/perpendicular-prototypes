import { DynamicKitConfiguration} from '../models/dynamic-kit-configuration.model';

/**
 * Provider to fetch [[DynamicKitConfiguration]] from backend systems.
 */
export abstract class IDynamicKitConfigurationProvider {


    /**
     * Loads single entry from backend
     */
    public abstract getDynamicKitConfigurationById(id: string): Promise<DynamicKitConfiguration>;

}
