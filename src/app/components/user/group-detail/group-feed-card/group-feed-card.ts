import { Component, inject, input , ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GroupService } from '@app/core/services/group.service';
import { SharedSession } from '@app/core/models/session.model';
import { Eye, LucideAngularModule, MoreVertical, Lock, Trash } from 'lucide-angular';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { createMutation } from '@app/core/utils/mutation.helper';
import { SessionService } from '@app/core/services/session.service';
import { toast } from 'ngx-sonner';
import { AlertService } from '@app/components/shared/alert/alert.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-group-feed-card',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmBadgeImports,
    LucideAngularModule,
    HlmButtonImports,
    DatePipe,
    HlmDropdownMenuImports
  ],
  templateUrl: './group-feed-card.html',
})
export class GroupFeedCardComponent {
  groupService = inject(GroupService);
  sessionService = inject(SessionService);
  alertService = inject(AlertService);
  session = input.required<SharedSession>();
  userId = input.required<string>();
  userRole = input<'ADMIN' | 'MEMBER' | 'OWNER' | null>();
  protected MoreVertical = MoreVertical;
  protected Eye = Eye;
  protected Lock = Lock;
  protected Trash = Trash;

  unshareSessionMutation = createMutation({
    mutationFn: () => this.sessionService.unshareSession(this.session().sessionId, this.session().groupId),
    onSuccess: () => {
      toast.success('Session unshared successfully', {
        description: 'The session has been removed from the group feed.',
      });
    },
    onError: (err) => {
      toast.error('Failed to unshare session', { description: err });
    },
  }); 

  onUnshareSession() {
    this.alertService.show({
      description: 'Are you sure you want to remove this session from the group feed?',
      variant: 'destructive',
      actionLabel: 'Yes, Unshare',
      action: () => this.unshareSessionMutation.mutate({}),
    });
  }
}
