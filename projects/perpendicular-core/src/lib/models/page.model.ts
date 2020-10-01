import { BaseModel } from './base.model';

/**
 * This object represents a "Content" page. Normally layouts are assigned to either Products, Categories or Content, so this serves
 * as the baseline object representing a generic piece of Content;
 */
export abstract class Page extends BaseModel {
    /**
     * The internal identifier  of the page. Used to look up which layout to apply.
     */
    public pageId?: string;

    /**
     * The external identifier of the page. Not related to its title or contents as such.
     * @example
     *
     * - Campaign1LandingPage
     * - PrivacyPolicyPage
     *  etc
     *
     */
    public pageName?: string;
}
