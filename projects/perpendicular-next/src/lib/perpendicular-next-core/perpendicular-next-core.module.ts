import { NgModule } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ORIGIN_HOST, ORIGIN_URL, PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS, PERPENDICULAR_HTTP } from '@perpendicular/core';
import { HttpClient } from '@angular/common/http';



/**
 * returns the hostname from which the page was loaded.
 */
export function getOriginHost(document: Document): string {
  let originHost = '';
  if (document && document.location) {
    originHost = document.location.hostname;
  }
  return originHost;
}

/**
 * returns the origin host URL
 */
export function getOriginUrl(originHost: string): string {
  return 'https://' + originHost;
}

/**
 * Core module for the prototype module
 */
@NgModule({
  providers: [
    {
      provide: PERPENDICULAR_HTTP,
      useExisting: HttpClient,
    },
    {
      // default to 60 days
      provide: PERPENDICULAR_DEFAULT_COOKIE_EXPIRY_IN_SECONDS,
      useValue: 60 * 24 * 60 * 60,
    },
    {
      provide: ORIGIN_HOST,
      useFactory: getOriginHost,
      deps: [DOCUMENT],
    },
    {
      provide: ORIGIN_URL,
      useFactory: getOriginUrl,
      deps: [ORIGIN_HOST],
    }
  ],
})
export class PerpendicularNextCoreModule {}
