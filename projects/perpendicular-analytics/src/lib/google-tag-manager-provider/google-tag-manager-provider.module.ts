import { NgModule } from '@angular/core';
import { EnhancedAngulartics2GoogleTagManager } from './google-tag-manager.provider';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    EnhancedAngulartics2GoogleTagManager
  ]
})
export class GoogleTagManagerProviderModule { }

// Modules
export { GoogleTagManagerProviderModule } from './lib/google-tag-manager-provider/google-tag-manager-provider.module';

// Providers
export { EnhancedAngulartics2GoogleTagManager } from './lib/google-tag-manager-provider/google-tag-manager.provider';
