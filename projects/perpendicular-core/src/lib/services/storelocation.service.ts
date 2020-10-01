import { StoreLocation, StoreLocationSearchResult } from '../models/storelocation.model';

/**
 * A stateless UI service to locate physical stores.
 */
export abstract class IStoreLocationService<
  StoreLocationType extends StoreLocation = StoreLocation,
  StoreLocationSearchResultType extends StoreLocationSearchResult = StoreLocationSearchResult
> {
  /**
   * Returns all physical stores.
   */
  public abstract getAllStores(): Promise<Array<StoreLocationType>>;

  /**
   * returns the [[Store]]s within 10km of the lat/lon. Coordinates assumed to be WSG84.
   *
   * @param longitude the longitude in WSG84 notation
   * @param latitude the latitude in WSG84 notation
   * @param radiusInKm the distance from the lat/long to search within.
   * @param maxItems number of items to return
   */
  public abstract getStoresByLongitudeAndLatitude(
    longitude: number,
    latitude: number,
    radiusInKm?: number,
    maxItems?: number,
  ): Promise<Array<StoreLocationType>>;

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
    pageSize?: number,
    pageNumber?: number,
  ): Promise<StoreLocationSearchResultType>;
}
