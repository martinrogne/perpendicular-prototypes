/**
 * The potential states of the origin of
 * the model
 */
export enum ModelOrigin {
    Model,
    Factory,
    Server
}

/**
 * Base entity for all models, providing the basic properties
 * expected to exist on all entities
 */
export abstract class BaseModel {
    public origin: ModelOrigin = ModelOrigin.Model;
}
