import { StoreLocation, StoreLocationSearchResult } from '../models/storelocation.model';

/**
 * Provider to look up information about physical stores associated with your website.
 *
 * FIXME: should probably also have some kind of get by id, or get all function.
 */
export abstract class IStoreLocationProvider {
    /**
     * Looks up a single store
     */
    public abstract getStore(id: string): Promise<StoreLocation>;

    /**
     * Finder, to find stores based on their physical location.
     *
     * @param city if set, limits search results to stores in that city
     * @param province if set, limits search results to stores in that province
     * @param state if set, limits search results to stores in that state
     * @param country if set, limits search results to stores in that country
     * @param pageSize number of results to return pr page
     * @param pageNumber the page to find. 1 being first page.
     */
    public abstract getStoresByLocation(
        city: string,
        province: string,
        state: string,
        country: string,
        pageSize: number,
        pageNumber: number,
    ): Promise<StoreLocationSearchResult>;

    /**
     * finds all stores near the long/lat passed, in a 10km radius.
     *
     * Note, by its nature, this function will not return more than one page of results.
     *
     * @param longitude Decimal Degree encoded longitude to search from
     * @param latitude Decimal Degree encoded latitude to search from
     * @param radiusInKm distance to search from center point given by longitude and latitude
     * @param pageSize maximum number of items to return.
     */
    public abstract getStoresByLongitudeAndLatitude(
        longitude: number,
        latitude: number,
        radiusInKm: number,
        pageSize: number,
    ): Promise<StoreLocationSearchResult>;
}
