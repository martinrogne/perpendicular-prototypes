import { BaseModel } from './base.model';

/**
 * This class represents country specific information, i.e. things like phone prefixes, displaynames etc.
 * FIXME: consider maing the properties protected or  private instead.
 */
export class Country extends BaseModel {
    /**
     * Country code for phone numbers.
     */
    public callingCode = '';

    /**
     * List of regions in the country.
     */
    public states: Array<string> = [];

    /**
     * Displayname of country, in the users currently selected langauge.
     */
    public displayName = '';

    /**
     * 2 letter UN code for the country.
     */
    public code = '';

    /**
     * Deserializer from backend service.
     */
    fill(bo: any): void {
        if (null != bo && bo !== undefined) {
            this.callingCode = bo.callingCode;
            this.displayName = bo.displayName;
            this.code = bo.code;

            for (const state of bo.states) {
                this.states.push(state);
            }
        }
    }
}
