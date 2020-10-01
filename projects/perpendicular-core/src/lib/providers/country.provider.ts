import { CountryList } from '../services/address.service';

/**
 * This provider is responsible for fetching countries from the backend
 */
export abstract class ICountryProvider {
    /**
     * Returns a Promise with the total list of countries supported by the backend system.
     */
    public abstract getCountries(): Promise<CountryList>;
}
