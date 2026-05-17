import { Component, input, output , ChangeDetectionStrategy } from '@angular/core';
import { NotificationItem } from '../notification-item/notification-item';
import { Notification } from '@app/core/models/notification.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-notifications-list',
  imports: [NotificationItem],
  templateUrl: './notifications-list.html',
})
export class NotificationsList {
  notifications = input.required<Notification[]>();
  markAsRead = output<string>();

  onMarkAsRead(id: string) {
    this.markAsRead.emit(id);
  }
}
