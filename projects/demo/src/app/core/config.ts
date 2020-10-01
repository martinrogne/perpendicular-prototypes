import { ProvidersWCSConfig, WCS_SERVER_NAME, SOLR_SERVER_NAME } from 'perpendicular-providers-wcs';
import { environment } from '../../environments/environment';

/**
 * This creates a new hardcoded configuration on where to resolve rest paths for all providers in providers-wcs.
 * If you wanted to read these from the server instead, this should be co-injected in the APP_INITIALIZER injection token
 */
export function setupWCSConfig(wcsServer: string, solrServer: string): ProvidersWCSConfig {
  const cfg = new ProvidersWCSConfig();
  cfg.storeId = environment.config.storeId;
  cfg.casStoreId = environment.config.casStoreId;
  cfg.languageId = -1;
  cfg.catalogId = environment.config.catalogId;
  cfg.sasStoreId = environment.config.sasStoreId;
  cfg.wcsServerHost = 'https://' + wcsServer;
  cfg.solrServerHost = 'https://' + solrServer + ':' + environment.config.solrPort;
  cfg.imageBaseUrl = cfg.wcsServerHost + ':' + environment.config.assetsPort;
  cfg.attachmentBaseUrl = cfg.imageBaseUrl + '/wcsstore/';
  cfg.useExtendedSEOTokenLookupLogic = true;
  return cfg;
}

/**
 * Default bindings required for initializing Perpendicular
 */
export const APP_CONFIG_BINDINGS = [
  {
    provide: WCS_SERVER_NAME,
    useValue: environment.config.serverName,
  },
  {
    provide: SOLR_SERVER_NAME,
    useValue: environment.config.solrServerName,
  },
  {
    provide: ProvidersWCSConfig,
    useFactory: setupWCSConfig,
    deps: [WCS_SERVER_NAME, SOLR_SERVER_NAME],
  }
];
