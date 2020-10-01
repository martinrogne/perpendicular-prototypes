import { MarketingInput } from '../models/marketing/marketing-input.model';
import { ESpot } from '../models/marketing/espot.model';

/**
 * Fetch marketing data from backend. The marketing engine relies on having certain "Viewports", called "Marketing Spots", which are
 * basically just areas of the screen left up to the marketing engine to populate.
 */
export abstract class IESpotProvider {
    /**
     * Fetches the content to display in an marketing spot.
     *
     * @param name the marketing spot name. Must match something on the backend servers marketing engine
     * @param input the composite type representing the full set of input parameters to the marketing engine
     */
    public abstract getESpot(name: string, input: MarketingInput): Promise<ESpot>;
}
