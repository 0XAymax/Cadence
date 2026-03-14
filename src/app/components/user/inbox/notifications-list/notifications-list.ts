import { Component } from '@angular/core';
import { NotificationItem, NotificationItemData } from '../notification-item/notification-item';
import { Bell, CalendarClock, MessageCircle, AlertTriangle, Users } from 'lucide-angular';

@Component({
  selector: 'app-notifications-list',
  imports: [NotificationItem],
  templateUrl: './notifications-list.html',
})
export class NotificationsList {
  readonly notifications: NotificationItemData[] = [
    {
      title: 'Deadline today',
      message: 'Submit your Physics lab report by 5:00 PM.',
      time: '2m ago',
      unread: true,
      icon: AlertTriangle,
    },
    {
      title: 'Schedule updated',
      message: 'Your study plan for tomorrow has been generated.',
      time: '18m ago',
      unread: true,
      icon: CalendarClock,
    },
    {
      title: 'New message',
      message: 'Sara mentioned you in “CS Study Group”.',
      time: '1h ago',
      unread: false,
      icon: MessageCircle,
    },
    {
      title: 'Group update',
      message: 'Math Club added a new session for Friday.',
      time: '3h ago',
      unread: false,
      icon: Users,
    },
    {
      title: 'Reminder',
      message: 'You’ve completed 4/5 sessions this week.',
      time: 'Yesterday',
      unread: false,
      icon: Bell,
    },
  ];
}
