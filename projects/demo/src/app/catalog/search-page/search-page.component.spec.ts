import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { MockProductSearchServiceModule } from 'perpendicular-services-mock';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { SearchPageComponent } from './search-page.component';
import { FacetsComponent } from '../shared/facets/facets.component';
import { MockComponent } from 'ng-mocks';
import { ProductGridComponent } from '../shared/product-grid/product-grid.component';

describe('SearchPageComponent', () => {
  let spectator: Spectator<SearchPageComponent>;
  const createComponent = createComponentFactory({
    component: SearchPageComponent,
    declarations: [
      MockComponent(FacetsComponent),
      MockComponent(ProductGridComponent)
    ],
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
