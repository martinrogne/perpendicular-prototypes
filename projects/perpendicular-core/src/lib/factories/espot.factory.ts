import { Inject } from '@angular/core';
import { ESpot } from '../models/marketing/espot.model';

/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
export abstract class IESpotFactory {
    /**
     * instantiates a new espot object
     */
    public abstract newInstance(): ESpot;
    /**
     * instantiates a new espot object and deserializes it from the passed json
     */
    public abstract newInstanceFromJSON(json: any): ESpot;
}
