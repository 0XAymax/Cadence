import { Component, input, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmIconImports } from '@spartan-ng/helm/icon';
import { provideIcons } from '@ng-icons/core';
import { lucideMoreVertical } from '@ng-icons/lucide';
import { MemberItem, RequestItem } from '../../../../core/models/group.model';

@Component({
  selector: 'app-group-members-tab',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmDropdownMenuImports,
    HlmIconImports,
    DatePipe,
  ],
  providers: [provideIcons({ lucideMoreVertical })],
  templateUrl: './group-members-tab.html',
})
export class GroupMembersTabComponent {
  members = input.required<MemberItem[]>();
  requests = input.required<RequestItem[]>();
  currentUserRole = input<'ADMIN' | 'MEMBER' | null>();
  currentUserId = input.required<string>();

  promote = output<string>();
  demote = output<string>();
  remove = output<string>();
  acceptRequest = output<string>();
  declineRequest = output<string>();
}
