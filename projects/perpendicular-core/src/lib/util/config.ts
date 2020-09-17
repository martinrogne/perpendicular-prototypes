import { Injectable } from '@angular/core';

/**
 * All the configuration needed by the provider layer to talk to a regular WCS instance
 */
@Injectable()
export class ProvidersWCSConfig {
  /**
   * If search requests should check entitlement
   * Default false.
   */
  public checkEntitlement = false;

  /**
   * The store id to use
   */
  public storeId = 0;

  /**
   * The Shared catalog asset store (if any)
   */
  public casStoreId = 0;
  /**
   * The shared store front asset store (if any)
   */
  public sasStoreId = 0;

  /**
   * if false, will only search for seo tokens in one store. (Version 8 Compatibility)
   * if true will query all stores in order, and return from the most specific one
   */
  public useExtendedSEOTokenLookupLogic = true;

  /**
   * The language Id to bootstrap with
   */
  public languageId = -1;

  /**
   * FQDN and port of wcs server, i.e. 'https://localhost:443'
   */
  public wcsServerHost = '';

  /**
   * FQDN and port of solr server, i.e. 'https://localhost:443'
   */
  public solrServerHost = '';

  /**
   * The base URL of the REST endpoint, I.e. /wcs/resources/,
   * defaults to '/wcs/resources'
   */
  public wcsServerBaseRestUrl = '/wcs/resources';

  /**
   * The base URL of the REST endpoint, I.e. /search/resources/
   * defaults to '/search/resources'
   */
  public solrServerBaseRestUrl = '/search/resources';

  /**
   * Base URL for all images. Must be absolute url prefix.
   */
  public imageBaseUrl = '';

  /**
   * The unique ID of the catalog the customer should be viewing
   */
  public catalogId = 0;

  /**
   * The currency to use
   */
  public currency = '';

  /**
   * Indicates if outgoing calls should add references to the langId, catalogId and currency
   * set in this configuration
   */
  public useExplicitWCSParams = false;

  /**
   * The default calculation code to apply to operations that manipulate the basket.
   * You can override the relevant getXXXPayload if you want a non-default value sent
   * for certain operations
   */
  public defaultCalculationCodes = '-1,-2,-3,-4,-5,-6,-7';

  /**
   * Specifies whether the customer is notified when the order processing is complete.
   * Email notifications are not sent if PrimePaymentCmd fails. A value of 1 specifies that
   * the customer is notified; a value of 0 specifies that the customer is not notified.
   */
  public notifyShopperOnCheckout = true;

  /**
   * Specifies whether the store is notified when the order processing is complete.
   */
  public notifyMerchantOnCheckout = false;

  /**
   * Specifies whether the customer is notified when the order is successfully submitted for processing.
   * A value of 1 specifies that the customer is notified;
   * a value of 0 specifies that the customer is not notified. The default is false.
   */
  public notifyOrderSubmitted = false;

  /**
   * Base URL for all Attachments. Must be absolute url prefix.
   */
  public attachmentBaseUrl = '';

  /**
   * The limits on the amount of categories retrieved from WCS when populating
   * the hierarchical structure from the top. Defaults to -1,-1,-1 (all categories,
   * three levels deep)
   */
  public categoryHierarchyLimit = '-1,-1,-1';

  /**
   * The price mode that should be used when retrieving prices as part of a product look-up. This can
   * be one of:
   *
   * - calculated
   * - mixed
   * - indexed
   */
  public priceMode?: 'calculated' | 'indexed' | 'mixed';

  /**
   * Helper function to get endpoint url for specific function in WCS , for the main store id
   */
  public getWcsEndpointUrl(resourcePath: string): string {
    return this.getEndpointUrlForStore(this.wcsServerHost, this.wcsServerBaseRestUrl, resourcePath, this.storeId);
  }

  /**
   * Helper function to get endpoint url for specific function in SOLR, for the main store id
   */
  public getSolrEndpointUrl(resourcePath: string): string {
    return this.getEndpointUrlForStore(this.solrServerHost, this.solrServerBaseRestUrl, resourcePath, this.storeId);
  }

  /**
   * Generate a fully qualified URL to a specific resources endpoint.
   * The returned URL will never end on a '/';
   */
  public getEndpointUrlForStore(serverHostName: string, baseRestUrl: string, resourcePath: string, storeId: number): string {
    let ep = serverHostName;
    if (ep.startsWith('/')) {
      ep = '/' + ep;
    }
    ep += baseRestUrl;

    if (!ep.endsWith('/')) {
      ep += '/';
    }
    ep += 'store/' + storeId;
    if (!resourcePath.startsWith('/')) {
      ep += '/';
    }
    ep += resourcePath;
    if (ep.endsWith('/')) {
      ep = ep.substr(0, ep.length - 1);
    }

    return ep;
  }
}
