import { Component } from '@angular/core';
import { LucideAngularModule, Inbox } from 'lucide-angular';

@Component({
  selector: 'app-inbox-empty-state',
  imports: [LucideAngularModule],
  templateUrl: './inbox-empty-state.html',
})
export class InboxEmptyState {
  readonly Inbox = Inbox;
}
