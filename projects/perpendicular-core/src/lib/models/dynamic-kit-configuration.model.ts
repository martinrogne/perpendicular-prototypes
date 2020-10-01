/**
 * A Model class representing DynamicKitConfiguration
 * This is a base class that can be used generically, but specialized versions can be provided for
 * known usecases.
 *
 * TODO: Add public fields and properties.
 * Please remember that this will be an immutable, so avoid doing
 * expensive operations in getter properties, like
 * ```
 *    public get mySpecialAttribute(): string {
 *       if (this.attributes) {
 *          return this.attributes.find(x => x.name === 'mySpecialAttribute').value;
 *       }
 *    }
 * ```
 * It is better to precalc these in the `DynamicKitConfigurationFactory#newInstanceFromJSON`
 *
 * The `core` version should contain the generic data that can be assumed to be available on any platform.
 * You cannot instantiate this class directly, rather you must use its associated factory.
 * @see IDynamicKitConfigurationFactory
 */
export abstract class DynamicKitConfiguration {

    /**
     * ID of the DynamicKitConfiguration
     */
    public id?: string;

    /**
     * The type of kit configuration.
     */
    public type = '';

    /**
     * The most basic version of this.
     * In concrete overrides, you should add additional fields, and serialize them as json, for instance,
     * in your local override if [[IDynamicKitConfigurationFactory]]
     */
    public configuration = '';
}
