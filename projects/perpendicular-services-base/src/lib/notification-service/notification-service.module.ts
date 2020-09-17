import { NgModule } from '@angular/core';
import { INotificationService } from 'perpendicular-core';
import { NotificationService } from './notification-service.service';

@NgModule({
  declarations: [],
  imports: [
  ],
  providers: [
    { provide: INotificationService, useClass: NotificationService }
  ]
})
export class NotificationServiceModule { }
