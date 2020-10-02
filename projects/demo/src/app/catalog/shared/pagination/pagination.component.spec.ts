import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MockProductSearchServiceModule } from 'perpendicular-services-mock';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let spectator: Spectator<PaginationComponent>;
  const createComponent = createComponentFactory({
    component: PaginationComponent,
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
