import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let spectator: Spectator<SearchBarComponent>;
  const createComponent = createComponentFactory(SearchBarComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
