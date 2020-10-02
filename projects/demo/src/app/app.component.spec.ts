import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { RouterOutlet } from '@angular/router';

describe('SearchBarComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [
      MockComponent(HeaderComponent),
      MockComponent(FooterComponent),
      MockComponent(RouterOutlet)
    ]
  });

  beforeEach(() => spectator = createComponent());

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
