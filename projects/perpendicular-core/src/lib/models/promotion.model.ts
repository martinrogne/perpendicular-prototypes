import { BaseModel } from './base.model';

/**
 * This class represents a specific promotion from the promotion engine,
 * FIXME: Verify this.
 */
export class Promotion extends BaseModel {
    /**
     * Promotion instance identifier.
     */
    public id?: string;

    /**
     * External identifier for promotion. Not to be confused with a promotion code entered by the customer.
     */
    public code?: string;

    /**
     * Promotion is valid from this date (inclusive)
     */
    public startDate?: string;
    /**
     * Promotion terminates on this date (inclusive)
     */
    public endDate?: string;

    /**
     * Short description of promtion, in users currently selected langauge.
     */
    public shortDescription = '';

    /**
     * Long description of promotion, in users currently selected language.
     */
    public longDescription = '';
}
