import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MockProductSearchServiceModule } from 'perpendicular-services-mock';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let spectator: Spectator<SearchPageComponent>;
  const createComponent = createComponentFactory({
    component: SearchPageComponent,
    imports: [
      WCSProductFactoryModule,
      MockProductSearchServiceModule
    ],
    providers: [
      ProvidersWCSConfig
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
