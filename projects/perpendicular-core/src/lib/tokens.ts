import { InjectionToken } from '@angular/core';

/**
 * Injection token to use to get the right HTTP implementation
 */
export const PERPENDICULAR_HTTP = new InjectionToken('PERPENDICULAR_HTTP');

/**
 * Injection token to use, to enable http traces
 */
export const PERPENDICULAR_HTTP_TRACE = new InjectionToken<boolean>('TRACE_HTTP_CALLS');

/**
 * Injection token to use, to provide a string to prepend to all traces. Usually used in unittests
 * to determine which test the trace belongs to.
 */
export const PERPENDICULAR_HTTP_TRACE_CONTEXT = new InjectionToken<boolean>('TRACE_HTTP_CONTEXT');

/**
 * The default expiry of cookies created with the cookie service. In seconds.
 * Defaults to 60 days.
 */
export const PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS = new InjectionToken<number>('PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS');

/**
 * Injection token to set default page size for product searches.
 */
export const PRODUCTSEARCH_DEFAULT_PAGESIZE = new InjectionToken<number>('PRODUCTSEARCH_DEFAULT_PAGESIZE');

/**
 * Injection token to set time allowed for subsequent requests to be bundled.
 */
export const PRODUCTSEARCH_BUFFER_TIME = new InjectionToken<number>('PRODUCTSEARCH_BUFFER_TIME');

/**
 * Injection token to set time allowed for subsequent requests to be bundled.
 */
export const PRODUCTSEARCH_BUFFER_LIMIT = new InjectionToken<number>('PRODUCTSEARCH_BUFFER_LIMIT');

/**
 * Injection token to set the product search behavior vis-a-vis how it matches products and skus
 */
export const PRODUCTSEARCH_SEARCHTYPE = new InjectionToken<number>('PRODUCTSEARCH_SEARCHTYPE');

/**
 * Injection token to set SEO title suffix
 */
export const SEO_TITLE_SUFFIX = new InjectionToken('SEO_TITLE_SUFFIX');

/**
 * The fallback image to use in seo contexts, if no other image is available. Relative to website root.
 */
export const SEO_FALLBACK_IMAGE = new InjectionToken('SEO_FALLBACK_IMAGE');

/**
 * The main URL of the website. Used by SSR as its typically accessed proxy-wise on localhost.
 */
export const ORIGIN_URL = new InjectionToken<number>('ORIGIN_URL');

/**
 * The main hostname of the website. Used by SSR as its typically accessed proxy-wise on localhost.
 */
export const ORIGIN_HOST = new InjectionToken<number>('ORIGIN_HOST');

/**
 * Provide this, if you need to have the origin host be something other than the launch domain.
 * This is mostly used for development, where you might want to pass a value from the environment, to have the
 * data services be loading from some other location
 */
export const ORIGIN_HOST_OVERRIDE = new InjectionToken<number>('ORIGIN_HOST_OVERRIDE');

/**
 * Default physical store id for purposes of pickup in store
 */
export const CARTSERVICE_BOPIS_DEFAULTLOCATIONID = new InjectionToken<string>('CARTSERVICE_BOPIS_DEFAULTLOCATIONID');

/**
 * Default point (latitude) at which to start searching for stores if nothing else is known
 */
export const CARTSERVICE_BOPIS_DEFAULTLAT = new InjectionToken<number>('CARTSERVICE_BOPIS_DEFAULTLAT');

/**
 * Default point (longitude) at which to start searching for stores if nothing else is known
 */
export const CARTSERVICE_BOPIS_DEFAULTLON = new InjectionToken<number>('CARTSERVICE_BOPIS_DEFAULTLON');

/**
 * The number of ms to wait for more requests to show up, for purposes of bundling
 */
export const INVENTORY_BUFFER_TIME = new InjectionToken<number>('Inventory.BufferTime');

/**
 * The max number of requests to bundle
 */
export const INVENTORY_BUFFER_LIMIT = new InjectionToken<number>('Inventory.BufferLimit');

/**
 * The number of ms to wait for more requests to show up, for purposes of bundling
 */
export const PRICE_BUFFER_TIME = new InjectionToken<number>('Price.BufferTime');

/**
 * The max number of requests to bundle
 */
export const PRICE_BUFFER_LIMIT = new InjectionToken<number>('Price.BufferLimit');




// FIXME: Temporarily placed here during migration - consider where to migrate
export const IDENTITY_SERVICE_FETCH_ENTITLED_ORGS = new InjectionToken<boolean>('IDENTITY_SERVICE_FETCH_ENTITLED_ORGS');
export const GUEST_LOGIN_MARKETING_CONSENT = new InjectionToken<boolean>('GUEST_LOGIN_DEFAULT_MARKETING_CONSENT');
export const AUTH_COOKIE_SESSION_ONLY = new InjectionToken<boolean>('AUTH_COOKIE_SESSION_ONLY');
export const AUTH_COOKIE_NAME = new InjectionToken<boolean>('AUTH_COOKIE_NAME');
export const MARKETING_CONSENT_COOKIE_PREFIX = new InjectionToken<string>('MARKETING_CONSENT_COOKIE_PREFIX');
export const PRIVACY_POLICY_COOKIE_PREFIX = new InjectionToken<string>('PRIVACY_POLICY_COOKIE_PREFIX');
export const PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE = new InjectionToken<boolean>('PRODUCTREGISTRY_CLEAR_ON_IDENTITY_CHANGE');
export const NOTIFICATION_SERVICE_STABLE_DELAY = new InjectionToken<number>('NOTIFICATION_SERVICE_STABLE_DELAY');
export const WCS_SERVER_NAME = new InjectionToken('WCS_SERVER_NAME');
export const SOLR_SERVER_NAME = new InjectionToken('SOLR_SERVER_NAME');
