import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { FacetsComponent } from './facets.component';

describe('FacetsComponent', () => {
  let spectator: Spectator<FacetsComponent>;
  const createComponent = createComponentFactory(FacetsComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
