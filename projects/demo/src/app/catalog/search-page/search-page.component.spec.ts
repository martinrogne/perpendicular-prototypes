import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { SearchPageComponent } from './search-page.component';

describe('SearchPageComponent', () => {
  let spectator: Spectator<SearchPageComponent>;
  const createComponent = createComponentFactory(SearchPageComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
