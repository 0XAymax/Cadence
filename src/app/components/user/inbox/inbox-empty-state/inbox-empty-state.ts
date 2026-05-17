import { Component , ChangeDetectionStrategy } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-inbox-empty-state',
  imports: [NgIconsModule],
  templateUrl: './inbox-empty-state.html',
})
export class InboxEmptyState {}
