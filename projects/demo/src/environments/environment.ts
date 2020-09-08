// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: 'develop',

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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
