import { NgModule } from '@angular/core';
import { ICookieService } from 'perpendicular-core';
import { MockCookieService } from './mock-cookie.service';


@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ICookieService, useClass: MockCookieService }
  ]
})
export class MockCookieServiceModule { }
