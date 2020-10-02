import { NgModule } from '@angular/core';
import { IIdentityService } from 'perpendicular-core';
import { MockIdentityService } from './mock-identity.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IIdentityService, useClass: MockIdentityService }
  ]
})
export class MockIdentityServiceModule { }
