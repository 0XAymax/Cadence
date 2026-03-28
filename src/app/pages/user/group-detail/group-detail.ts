import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { Group } from '../../../core/models/group.model';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { ShareSessionDialogComponent } from '../../../components/user/group-detail/share-session-dialog/share-session-dialog';
import { GroupFeedCardComponent } from '../../../components/user/group-detail/group-feed-card/group-feed-card';
import { GroupMembersTabComponent } from '../../../components/user/group-detail/group-members-tab/group-members-tab';
import { GroupChatTabComponent } from '../../../components/user/group-detail/group-chat-tab/group-chat-tab';
import { GroupSettingsTabComponent } from '../../../components/user/group-detail/group-settings-tab/group-settings-tab';

@Component({
  selector: 'app-group-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    HlmTabsImports,
    HlmButtonImports,
    HlmBadgeImports,
    ShareSessionDialogComponent,
    GroupFeedCardComponent,
    GroupMembersTabComponent,
    GroupChatTabComponent,
    GroupSettingsTabComponent,
  ],
  templateUrl: './group-detail.html',
})
export class GroupDetailComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  groupService = inject(GroupService);

  groupId = signal<string>('');
  group = signal<Group | undefined>(undefined);

  myRole = signal<'MEMBER' | 'ADMIN' | null>(null);
  members = signal<any[]>([]);
  requests = signal<any[]>([]);
  feed = signal<any[]>([]);

  activeTab = signal<'feed' | 'members' | 'chat' | 'settings'>('feed');
  shareDialogState = signal<'closed' | 'open'>('closed');

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.groupId.set(id);
        const g = this.groupService.getGroupById(id);
        if (!g) {
          this.router.navigate(['/user/groups']);
          return;
        }
        this.group.set(g);
      }
    });

    effect(
      () => {
        const gId = this.groupId();
        if (gId) {
          // Sync state from services based on active group param
          this.myRole = this.groupService.getMyRole(gId) as any;
          this.members = this.groupService.getGroupMembers(gId) as any;
          this.requests = this.groupService.getGroupRequests(gId) as any;
          this.feed = this.groupService.getGroupFeed(gId) as any;
        }
      },
      { allowSignalWrites: true },
    );
  }

  setActiveTab(tab: any) {
    this.activeTab.set(tab);
  }

  get canLeaveGroup(): boolean {
    if (!this.group()) return false;
    const adminCount = this.members().filter((m) => m.role === 'ADMIN').length;
    return !(this.myRole() === 'ADMIN' && adminCount === 1);
  }

  leaveGroup() {
    this.groupService.leaveGroup(this.groupId());
    this.router.navigate(['/user/groups']);
  }

  onShareSession(sessionId: string) {
    this.groupService.shareSession(this.groupId(), sessionId);
  }

  onAddComment(sessionId: string, content: string) {
    this.groupService.addComment(sessionId, content);
  }

  onPromote(membershipId: string) {
    this.groupService.updateRole(membershipId, 'ADMIN');
  }

  onDemote(membershipId: string) {
    this.groupService.updateRole(membershipId, 'MEMBER');
  }

  onRemove(membershipId: string) {
    this.groupService.removeMember(membershipId);
  }

  onAcceptRequest(requestId: string) {
    this.groupService.acceptRequest(requestId);
  }

  onDeclineRequest(requestId: string) {
    this.groupService.declineRequest(requestId);
  }

  onUpdateGroup(data: { name: string; description: string; type: 'OPEN' | 'LOCKED' }) {
    this.groupService.updateGroup(this.groupId(), data);
  }

  onTransferAdmin(membershipId: string) {
    // Current user membership
    const myMem = this.members().find((m) => m.userId === this.groupService.currentUserId);
    if (myMem) {
      this.groupService.updateRole(myMem.membershipId, 'MEMBER');
    }
    // Promote selected
    this.groupService.updateRole(membershipId, 'ADMIN');
  }

  onDeleteGroup() {
    this.groupService.deleteGroup(this.groupId());
    this.router.navigate(['/user/groups']);
  }
}
