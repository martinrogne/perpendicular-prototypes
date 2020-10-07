import { Category } from 'perpendicular-core';

/**
 * Extension model of [[Category]] specific to WebSphere Commerce.
 *
 * Do not instatiate this class directly. Get it from [[ICategoryFactory]] via the DI framework.
 */
export class WCSCategory extends Category {
    /**
     * Default Constructor
     */
    constructor() {
        super();
    }
}
