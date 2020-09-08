import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from '@sentry/angular';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Integrations } from '@sentry/tracing';


if (environment.production) {
  enableProdMode();

  Sentry.init({
    dsn: 'https://76a3bfbe958a45309cbf6cc838ad5925@o444826.ingest.sentry.io/5420304',
    release: environment.appVersion,
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['https://perpendicular-storefront-prototype.netlify.app'],
        routingInstrumentation: Sentry.routingInstrumentation,
      }),
    ],
    tracesSampleRate: 1.0,
  });
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
