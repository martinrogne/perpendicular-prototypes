import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { EnhancedAngulartics2GoogleTagManager } from '@perpendicular/analytics';
import { Angulartics2 } from 'angulartics2';

/**
 * Root level module for the project, responsible for bootstrapping
 * everything else
 */
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Default constructor
   */
  constructor(provider: EnhancedAngulartics2GoogleTagManager,
              angulartics: Angulartics2) {
    provider.startTracking();
  }
}
