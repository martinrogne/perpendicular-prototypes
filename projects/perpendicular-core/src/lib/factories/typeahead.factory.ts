import { Inject } from '@angular/core';
import { TypeAheadType, TypeAheadResult, ProductTypeAheadResult, CategoryTypeAheadResult } from '../models/typeahead.model';

/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 *
 * Specifically, if you have other specialized handlers for type ahead results, you can hook them in here.
 */
export abstract class ITypeAheadFactory {
    /**
     * Instantiates a new TypeAheadResult object
     */
    public abstract newInstance(): TypeAheadResult;

    /**
     * Instantes a new TypeAheadResult object and deserializes it from the passed json
     */
    public abstract newInstanceFromJSON(json: any, type: TypeAheadType): TypeAheadResult;
}
