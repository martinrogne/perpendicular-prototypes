import { NgModule } from '@angular/core';
import { IProfileService } from 'perpendicular-core';
import { ProfileService } from './profile.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: IProfileService, useClass: ProfileService }
  ]
})
export class ProfileServiceModule { }
