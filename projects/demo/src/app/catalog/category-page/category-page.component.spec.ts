import { Spectator, createComponentFactory } from '@ngneat/spectator';

import { CategoryPageComponent } from './category-page.component';

describe('CategoryPageComponent', () => {
  let spectator: Spectator<CategoryPageComponent>;
  const createComponent = createComponentFactory(CategoryPageComponent);

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
