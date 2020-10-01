import { Page } from '../models/page.model';

/**
 * This class serves as an extension point for projects to hook into, and override specific model classes and their
 * deserialization.
 *
 * Perpendicular default behavior is to not know anything about how classes gets filled in. This is left as an excercies for the
 * backend components. That means, that all models here, are abstract superclasses, where each
 * backend component have to provide their own logic on how to deserialize the backend result message into the model.
 */
export abstract class IPageFactory {
    /**
     * instantiates a new Page object
     */
    public abstract newInstance(): Page;

    /**
     * instantiates a new Page object from JSON
     */
    public abstract newInstanceFromJSON(json: any): Page;
}
