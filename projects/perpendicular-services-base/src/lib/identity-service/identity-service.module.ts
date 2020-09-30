import { NgModule } from '@angular/core';
import { IIdentityService } from 'perpendicular-core';
import { IdentityService } from './identity-service.service';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IIdentityService, useClass: IdentityService }
  ]
})
export class IdentityServiceModule { }

export { IdentityService } from './identity-service.service';
