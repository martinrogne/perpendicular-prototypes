import { NgModule } from '@angular/core';
import { IProfileService } from 'perpendicular-core';
import { MockProfileService } from './mock-profile.service';



@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProfileService, useClass: MockProfileService }
  ]
})
export class MockProfileServiceModule { }
