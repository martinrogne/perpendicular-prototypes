
/**
 * A base class for creating simple typed LRU cache for a single type.
 *  max entries are 2000 and one entry is saved for 1h
 */
export abstract class IRegistry<T> {
  // previously loaded items...
  protected cachedEntries: Map<string, Promise<T>>;

  /**
   * Default constructor
   */
  constructor() {
    this.cachedEntries = new Map<string, Promise<T>>();
  }

  /**
   * Clears all cached contents
   */
  public clear(): void {
    this.cachedEntries = new Map<string, Promise<T>>();
  }

  /**
   * For debug
   */
  public dump(): void {
    console.log(this.constructor.name);
    console.log('-----------------------');
    this.cachedEntries.forEach((val, key) => {
      console.log('   - ', key);
    });
    console.log('-----------------------');
  }
  /**
   * Adds a new entry to the cache.
   */
  public addEntry(entry: T | Promise<T>, ...lookupParams: any[]): void {
    const key = this.getKey(...lookupParams);
    let tmpProm = null;
    if (!(entry instanceof Promise)) {
      tmpProm = Promise.resolve(entry);
    } else {
      tmpProm = entry;
    }
    tmpProm.then(val => {
      this.cachedEntries.set(key, Promise.resolve(entry));
    });
  }

  /**
   * Converts the incoming search parameters to a cache key
   */
  protected getKey(...lookupParams: any[]): string {
    // for some reason, when we forward varargs, they get double-encased in array syntax
    // and this causes multi-key items to come out wrong
    if (lookupParams.length === 1 && lookupParams[0] instanceof Array) {
      lookupParams = lookupParams[0];
    }
    return lookupParams.map(x => String(x)).join('#');
  }

  /**
   * A must-override function to fetch the item from the backend provider
   */
  protected abstract fetchItem(...lookupParams: any[]): Promise<T>;

  /**
   * Inner function to perform the actual lookups. Expose strict versions in your overrides.
   */
  protected get(...lookupParams: any[]): Promise<T> {
    const key = this.getKey(...lookupParams);
    const cachedValue = this.cachedEntries.get(key);

    if (!!cachedValue) {
      return cachedValue;
    } else {
      const pi: Promise<T> = this.fetchItem(...lookupParams);
      this.addEntry(pi, ...lookupParams);
      return pi;
    }
  }
}
