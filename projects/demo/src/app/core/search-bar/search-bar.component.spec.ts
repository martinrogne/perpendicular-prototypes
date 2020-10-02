import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchBarComponent } from './search-bar.component';
import { MockProductSearchServiceModule } from 'perpendicular-services-mock';
import { WCSProductFactoryModule } from 'perpendicular-factories-wcs';
import { ProvidersWCSConfig } from 'perpendicular-core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SearchBarComponent', () => {
  let spectator: Spectator<SearchBarComponent>;
  const createComponent = createComponentFactory({
    component: SearchBarComponent,
    imports: [
      FormsModule,
      ReactiveFormsModule,
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
