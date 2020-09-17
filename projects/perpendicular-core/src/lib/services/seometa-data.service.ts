import { Injectable } from '@angular/core';

/**
 * This service will monitor route changes, and populate the <head> of the page with
 * meta tags with title, keywords and metadescription.
 * It optionally adds meta tags for the following services:
 *   - facebook
 *   - twitter
 *   - opengraph
 *
 *
 * Additionally, it will generate JSON+LD entries for the most common types (organization, website, product), and provide
 * hooks to allow things like breadcrumbs or other structured elements to be added as well.
 *
 * Its only really needed for server side rendering, so if performance is important to you, you can provide the noop-version on
 * browser renderings.
 *
 * For static routes, you can provide title and description information in the route itself like so
 * ```
 *
 *      data: {
 *        title: 'My account',
 *         description: 'The my account pages'
 *       },
 * ```
 * Additionally, you can set robot instructions in the same way
 * ```
 *   data: {
 *      title: 'My account',
 *      description: 'The my account pages',
 *      robot: 'noindex'
 *   },
 * ```
 *
 * ## Usage
 * In your app.module, add the module [[ServicesBasePageSEOModule]] to your imports.
 *
 * Then in the `provides` section, add the Extractors and Generators you want.
 *
 * *Extractors* check the route, and generate [[SEOMetaData]] for it, and *Generators* writes out those metadata for various consumers.
 *
 * Example config
 * ```
 *   { provide: SEO_FALLBACK_IMAGE, useValue: '/assets/logo.svg'},
 *   { provide: PRODUCT_LDJSON_SELLER, useValue: 'Solteq Oy'},
 *   { provide: OPENGRAPH_SITE_ID, useExisting: PRODUCT_LDJSON_SELLER },
 *   { provide: OPENGRAPH_LOGO, useExisting: SEO_FALLBACK_IMAGE },
 *
 *
 *   { provide: MetaDataExtractor, useClass: ProductMetaDataExtractor, multi: true },
 *   { provide: MetaDataExtractor, useClass: CategoryMetaDataExtractor, multi: true },
 *   { provide: MetaDataExtractor, useClass: StoreLocationMetaDataExtractor, multi: true },
 *   { provide: MetaDataExtractor, useClass: StaticContentPageMetaDataExtractor, multi: true },
 *   { provide: MetaDataGenerator, useClass: OpenGraphMetaDataGenerator, multi: true },
 * ```
 *
 * If you just want everything, simply import the module [[ServicesBasePageSEOConfigurationModule]]
 */
@Injectable()
export abstract class ISEOMetaDataService {
  /**
   * Call this to attach the seo service to the router navigation. It will automatically track on navigations
   */
  public abstract attachToRouter(): void;
}
