import { Injectable, signal, computed, inject, linkedSignal } from '@angular/core';
import {
  GroupCreateRequest,
  GroupResponse,
  Member,
  GroupUpdateRequest,
  JoinRequestResponse,
} from '../models/group.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { AuthService } from './auth.service';
import { createQuery } from '../utils/query.helper';
import { SharedSession, ShareSessionRequest } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  readonly currentUserId = computed<string | null | undefined>(() => {
    if (!this.authService.isReady()) return undefined;
    return this.authService.currentUser()?.id ?? null;
  });
  private readonly url = `${environment.apiUrl}/groups`;
  private groupId = signal<string | null>(null);
  readonly allGroups = createQuery<GroupResponse[]>([]);
  readonly groupMembers = createQuery<Member[]>([]);
  readonly currentGroup = createQuery<GroupResponse | null>(null);
  readonly joinRequests = createQuery<JoinRequestResponse[]>([]);

  public myGroups = computed(() => {
    const groups = this.allGroups.data();
    return groups.filter((g) => g.userRole != null);
  });

  public discoverGroups = computed(() => {
    const groups = this.allGroups.data();
    return groups.filter((g) => g.userRole == null);
  });

  public loadJoinRequests(groupId: string) {
    return this.joinRequests.load(
      this.http.get<JoinRequestResponse[]>(`${this.url}/${groupId}/requests`),
    );
  }

  public getGroupDataById(groupId: string) {
    return this.currentGroup.load(this.http.get<GroupResponse>(`${this.url}/${groupId}`));
  }

  public loadAllGroups() {
    return this.allGroups.load(this.http.get<GroupResponse[]>(`${this.url}/all`));
  }

  public loadGroupMembers(groupId: string) {
    return this.groupMembers.load(this.http.get<Member[]>(`${this.url}/${groupId}/members`));
  }

  public createGroup(payload: GroupCreateRequest) {
    return this.http.post<GroupResponse>(`${this.url}/create`, payload).pipe(
      tap((response) => {
        this.allGroups.mutate((groups) => [...groups, response]);
      }),
    );
  }

  public updateGroup(groupId: string, payload: GroupUpdateRequest) {
    return this.http.patch<GroupResponse>(`${this.url}/${groupId}`, payload).pipe(
      tap((response) => {
        this.allGroups.mutate((groups) => groups.map((g) => (g.id === groupId ? response : g)));
      }),
    );
  }

  public transferOwnership(newOwnerId: string) {
    return this.http.patch(`${this.url}/${this.groupId()}/transfer/${newOwnerId}`, {}).pipe(
      tap(() => {
        const groupId = this.groupId();
        this.allGroups.mutate((groups) => {
          return groups.map((group) => {
            if (group.id === groupId) {
              return { ...group, userRole: 'MEMBER' };
            }
            return group;
          });
        });
      }),
    );
  }

  public deleteGroup(groupId: string) {
    return this.http.delete(`${this.url}/${groupId}`).pipe(
      tap(() => {
        this.allGroups.mutate((groups) => groups.filter((g) => g.id !== groupId));
      }),
    );
  }

  public joinPublicGroup(groupId: string) {
    return this.http.post<Member>(`${this.url}/${groupId}/join`, {});
  }

  public requestJoin(groupId: string) {
    return this.http.post<JoinRequestResponse>(`${this.url}/${groupId}/join-request`, {});
  }

  public acceptJoinRequest(groupId: string, userId: string) {
    return this.http.patch<Member>(`${this.url}/${groupId}/requests/${userId}/approve`, {}).pipe(
      tap((newMember) => {
        this.groupMembers.mutate((m) => [...m, newMember]);
        this.joinRequests.mutate((r) => {
          return r.filter((m) => m.userId !== userId);
        });
      }),
    );
  }

  public declineJoinRequest(groupId: string, userId: string) {
    return this.http.delete(`${this.url}/${groupId}/requests/${userId}/reject`, {}).pipe(
      tap(() => {
        this.joinRequests.mutate((r) => r.filter((req) => req.userId !== userId));
      }),
    );
  }

  public leaveGroup(groupId: string) {
    return this.http.delete(`${this.url}/${groupId}/leave`, {});
  }

  public promoteMember(groupId: string, targetMemberId: string) {
    return this.http.patch(`${this.url}/${groupId}/members/${targetMemberId}/promote`, {}).pipe(
      tap(() => {
        this.groupMembers.mutate((members) => {
          return members.map((m) => {
            return m.membershipId === targetMemberId ? { ...m, role: 'ADMIN' } : m;
          });
        });
      }),
    );
  }

  public demoteMember(groupId: string, targetMemberId: string) {
    return this.http.patch(`${this.url}/${groupId}/members/${targetMemberId}/demote`, {}).pipe(
      tap(() => {
        this.groupMembers.mutate((members) => {
          return members.map((m) => {
            return m.membershipId === targetMemberId ? { ...m, role: 'MEMBER' } : m;
          });
        });
      }),
    );
  }

  public removeMember(groupId: string, targetMemberId: string) {
    return this.http.delete(`${this.url}/${groupId}/members/${targetMemberId}`).pipe(
      tap(() => {
        this.groupMembers.mutate((members) => {
          return members.filter((m) => m.membershipId !== targetMemberId);
        });
      }),
    );
  }

  public getGroupById(id: string): GroupResponse | undefined {
    return this.allGroups.data().find((g) => g.id === id);
  }

  public setGroupId(id: string) {
    this.groupId.set(id);
  }
}
