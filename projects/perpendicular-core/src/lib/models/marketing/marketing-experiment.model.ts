import { BaseModel } from '../base.model';

/**
 * This represents an experiment which may be associated with a given piece of content,
 * or a collection of these. WCS uses this experiment information to allow the business
 * user to decide on a winner in A/B testing.
 */
export class MarketingExperiment extends BaseModel {
    /**
     * The unique, internal ID of the activity associated with this experiment.
     */
    public activityId?: string;

    /**
     * The unique ID of the element associated with this particular branch.
     */
    public testElementId?: string;

    /**
     * The name of this particular branch.
     */
    public testElementName = '';

    /**
     * Indicator for whether or not the experiment element is a control element.
     */
    public controlElement = false;

    /**
     * The unique ID of the experiment element itself.
     */
    public experimentId?: string;

    /**
     * The name of the experiment element itself.
     */
    public experimentName = '';
}
