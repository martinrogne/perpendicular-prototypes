import { Country } from '../models/country.model';

export class CountryList {
    constructor(public countries: Array<Country>) {}
}

export abstract class IAddressService {
    /**
     * Get list of all countries supported by the store
     */
    public abstract getCountries(): Promise<CountryList>;
}
