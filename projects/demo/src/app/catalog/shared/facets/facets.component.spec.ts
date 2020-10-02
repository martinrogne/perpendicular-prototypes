import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { FacetsComponent } from './facets.component';
import { MockProductSearchServiceModule } from 'perpendicular-services-mock';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';

describe('FacetsComponent', () => {
  let spectator: Spectator<FacetsComponent>;
  const createComponent = createComponentFactory({
    component: FacetsComponent,
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
