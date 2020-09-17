import { Identity } from '../models/identity.model';

/**
 * This class allows caching of credentials between sessions. Good for "remember-me" scenarios
 */
export abstract class IIdentityCacheProvider {
    /**
     * Serializes the identity to whatever cache the platform supports
     */
    public abstract save(identity: Identity): void;

    /**
     * Returns a previously stored identity context
     */
    public abstract get(): Identity;

    /**
     * Clears the cache
     */
    public abstract clear(): void;
}
