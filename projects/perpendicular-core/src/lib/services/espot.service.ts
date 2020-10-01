import { ESpot } from '../models/marketing/espot.model';
import { MarketingInput } from '../models/marketing/marketing-input.model';

/**
 * UI service to look up what content to populate a specific marketing spot on the page with.
 */
export abstract class IESpotService<ESpotType extends ESpot = ESpot> {
  /**
   * Resolves content to show on a marketing spot on a page. A *marketing spot* is a section of a page, that is left to the external
   * marketing engine to populate.
   *
   * @param emsName Name of marketing spot to show content for
   * @param input the composite type representing the full set of input parameters to the marketing engine
   */
  public abstract getMarketingSpotContents(emsName: string, input?: MarketingInput): Promise<ESpotType>;
}
