import { Component, inject, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GroupService } from '@app/core/services/group.service';
import { SharedSession } from '@app/core/models/session.model';

@Component({
  selector: 'app-group-feed-card',
  standalone: true,
  imports: [CommonModule, HlmCardImports, HlmBadgeImports, HlmButtonImports, DatePipe],
  templateUrl: './group-feed-card.html',
})
export class GroupFeedCardComponent {
  session = input.required<SharedSession>();
  groupService = inject(GroupService);
}
