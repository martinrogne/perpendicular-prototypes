import { Inject } from '@angular/core';

import { StoreLocation, StoreLocationAttribute } from '../models/storelocation.model';
/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
export abstract class IStoreLocationFactory {
    /**
     * Instantiates a new Store object
     */
    public abstract newInstance(): StoreLocation;

    /**
     * Instantes a new Store object and deserializes it from the passed json
     */
    public abstract newInstanceFromJSON(json: any): StoreLocation;

    /**
     * Instantiate and deserialize a Storeattribute based on response from WebSphere Commerce.
     */
    public abstract newAttributeInstanceFromJSON(json: any): StoreLocationAttribute;

    /**
     * Instantiate a new [[StoreAttribute]]
     */
    public abstract newAttributeInstance(): StoreLocationAttribute;
}
