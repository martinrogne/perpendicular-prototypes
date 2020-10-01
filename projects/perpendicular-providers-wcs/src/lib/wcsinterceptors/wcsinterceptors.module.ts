import { Injector, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WCSAuthenticationInterceptor } from './wcsauthentication.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WCSAuthenticationInterceptor, multi: true, deps: [ Injector ] }
  ]
})
export class WCSInterceptorsModule { }
