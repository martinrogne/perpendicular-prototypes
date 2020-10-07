import { Layout, Widget, WidgetProperty } from 'perpendicular-core';

/**
 * WebSphere Commerce specific implementation of [[WidgetProperty]]
 * Do not instatiate this class directly. Get it from [[IWidgetPropertyFactory]] via the DI framework.
 */
export class WCSWidgetProperty extends WidgetProperty {
    /**
     * Default Constructor
     */
    constructor() {
        super();
    }
}

/**
 * WebSphere Commerce specific implementation of [[Widget]]
 * Do not instatiate this class directly. Get it from [[IWidgetFactory]] via the DI framework.
 */
export class WCSWidget extends Widget {
    /**
     * Default Constructor
     */
    constructor() {
        super();
    }
}

/**
 * WebSphere Commerce specific implementation of [[Layout]]
 * Do not instatiate this class directly. Get it from [[ILayoutFactory]] via the DI framework.
 */
export class WCSLayout extends Layout {
    /**
     * Default Constructor
     */
    constructor() {
        super();
    }
}
