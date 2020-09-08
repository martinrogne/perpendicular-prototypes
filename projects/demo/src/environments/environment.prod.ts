// @ts-ignore
import { version } from 'package.json';

export const environment = {
  production: true,
  appVersion: 'v' + version,

  config: {
    sasStoreId: 10101,
    storeId: 10201,
    casStoreId: 10051,
    catalogId: 10052,
    serverName: '159.8.241.44',
    solrServerName: '159.8.241.44',
    solrPort: 443,
    assetsPort: 443,
  }
};
