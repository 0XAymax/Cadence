import { Component } from '@angular/core';
import { InboxHeader } from '../../../components/user/inbox/inbox-header/inbox-header';
import { InboxFilters } from '../../../components/user/inbox/inbox-filters/inbox-filters';
import { NotificationsList } from '../../../components/user/inbox/notifications-list/notifications-list';

@Component({
  selector: 'app-inbox',
  imports: [InboxHeader, InboxFilters, NotificationsList],
  templateUrl: './inbox.html',
})
export class Inbox {}
