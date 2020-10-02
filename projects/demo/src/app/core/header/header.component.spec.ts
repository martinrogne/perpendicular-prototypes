import { Spectator, createRoutingFactory } from '@ngneat/spectator';
import { HeaderComponent } from './header.component';
import { MockComponent } from 'ng-mocks';
import { SearchBarComponent } from '../search-bar/search-bar.component';

describe('HeaderComponent', () => {
  let spectator: Spectator<HeaderComponent>;
  const createComponent = createRoutingFactory({
    component: HeaderComponent,
    declarations: [
      MockComponent(SearchBarComponent)
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
