import { Address } from './address.model';
import { BaseModel } from './base.model';

/**
 * Store location search result.
 * Represents a result of searching for a store from the frontend.
 *
 * Supports paging.
 */
export class StoreLocationSearchResult {
    /**
     * The stores in the result.
     */
    public storeLocations: Array<StoreLocation>;

    /**
     * Constructor
     * @param totalCount the total number of storelocations in the query, this result is related to.
     * @param pageNumber the page number, this result represents, in the total result-set
     */
    constructor(public totalCount: number, public pageNumber: number) {
        this.storeLocations = [];
    }
}

/**
 * Attribute related to a physical store. Semantics are defined by the front end implementor.
 * Examples of attributes could be
 *    - OpeningHoursMonFri: 8-19
 *    - OpeningHoursSat: 8-14
 */
export class StoreLocationAttribute extends BaseModel {
    /**
     * Internal name of attribute, i.e. "OpeningHoursMonFri", used for searching for stores by attribute
     */
    public name?: string;

    /**
     * Internal value of attribute i.e. "8-19", used for searching for stores by attribute
     */
    public value?: string;

    /**
     * Display name for attribute, in the users currently selected lanaguage i.e. "Opening Hours, monday - friday"
     */
    public displayName = '';
    /**
     * Display value for attribute, in the users currently selected lanaguage i.e. "08:00 to 19:00"
     */
    public displayValue = '';
}

/**
 * This class represents a physical outlet store, for use with Pickup in Store. GPS coordinates are assumed to be in WSG84 format.
 */
export class StoreLocation extends BaseModel {
    /**
     * Internal id of the physical store
     */
    public id?: string;

    /**
     * Phone number for customers to contact store
     */
    public phone = '';

    /**
     * Name of physical outlet.
     */
    public name = '';

    /**
     * Address of store.
     */
    public address?: Address;

    /**
     * Longitude of physical store, in WSG84 coordinates.
     */
    public longitude = 0;

    /**
     * Latitude of physical store, in WSG84 coordinates.
     */
    public latitude = 0;

    /**
     * Distance from user, if loaded from a location based search.
     */
    public distance = 0;

    /**
     * The attributes associated with this store
     */
    public attributes: StoreLocationAttribute[] = [];
}
