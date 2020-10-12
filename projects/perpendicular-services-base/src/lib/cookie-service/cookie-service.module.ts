import { NgModule } from '@angular/core';
import { ICookieService } from 'perpendicular-core';
import { CookieService } from './cookie.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: ICookieService, useClass: CookieService}
  ]
})
export class CookieServiceModule { }
