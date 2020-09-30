import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let spectator: Spectator<PaginationComponent>;
  const createComponent = createComponentFactory(PaginationComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
