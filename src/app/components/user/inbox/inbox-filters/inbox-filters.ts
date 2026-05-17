import { Component , ChangeDetectionStrategy } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inbox-filters',
  imports: [...HlmButtonImports],
  templateUrl: './inbox-filters.html',
})
export class InboxFilters {
  readonly filters = ['All', 'Unread', 'Mentions', 'Deadlines', 'Groups'];
}
