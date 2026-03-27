import { Component, input, Input } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface NotificationItemData {
  title: string;
  message: string;
  time: string;
  unread: boolean;
  icon: LucideIconData;
}

@Component({
  selector: 'app-notification-item',
  imports: [LucideAngularModule, ...HlmCardImports],
  templateUrl: './notification-item.html',
})
export class NotificationItem {
  item = input.required<NotificationItemData>();
}
