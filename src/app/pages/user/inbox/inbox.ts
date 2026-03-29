import { Component } from '@angular/core';
import { InboxHeader } from '@app/components/user/inbox/inbox-header/inbox-header';
import { InboxFilters } from '@app/components/user/inbox/inbox-filters/inbox-filters';
import { NotificationsList } from '@app/components/user/inbox/notifications-list/notifications-list';

@Component({
  selector: 'app-inbox',
  imports: [InboxHeader, InboxFilters, NotificationsList],
  templateUrl: './inbox.html',
})
export class Inbox {}
