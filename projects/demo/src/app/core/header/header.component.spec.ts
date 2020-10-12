import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';
import { MockComponent } from 'ng-mocks';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {
  WCSAddressFactoryModule,
  WCSCartFactoryModule,
  WCSPaymentInstructionFactoryModule,
  WCSPaymentMethodFactoryModule,
  WCSShippingModeFactoryModule
} from 'perpendicular-factories-wcs';
import { MockCartServiceModule } from 'perpendicular-services-mock';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createRoutingFactory({
    component: HeaderComponent,
    imports: [
      WCSCartFactoryModule,
      WCSShippingModeFactoryModule,
      WCSAddressFactoryModule,
      WCSPaymentInstructionFactoryModule,
      WCSPaymentMethodFactoryModule,
      MockCartServiceModule
    ],
    declarations: [
      MockComponent(SearchBarComponent)
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
