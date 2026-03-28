import { Injectable, signal, computed } from '@angular/core';
import {
  Group,
  GroupMembership,
  SharedSession,
  Comment,
  GroupJoinRequest,
  FeedSharedSession,
  MemberItem,
  RequestItem,
} from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  public currentUserId = 'user-1'; // Mock user

  private _groups = signal<Group[]>([
    { id: 'g1', name: 'Angular Lovers', description: 'Discussing Angular 21+', type: 'OPEN' },
    { id: 'g2', name: 'Secret Club', description: 'Top secret discussions', type: 'LOCKED' },
    { id: 'g3', name: 'TypeScript Fanatics', description: 'All about types', type: 'OPEN' },
  ]);

  private _memberships = signal<GroupMembership[]>([
    { id: 'm1', groupId: 'g1', userId: 'user-1', role: 'ADMIN', joinedAt: new Date() },
    {
      id: 'm2',
      groupId: 'g1',
      userId: 'user-2',
      role: 'MEMBER',
      joinedAt: new Date(Date.now() - 86400000),
    },
  ]);

  private _sharedSessions = signal<SharedSession[]>([
    {
      id: 'ss1',
      sessionId: 'sess1',
      groupId: 'g1',
      sharedByUserId: 'user-2',
      sharedAt: new Date(Date.now() - 3600000),
    },
  ]);

  private _comments = signal<Comment[]>([
    {
      id: 'c1',
      sharedSessionId: 'ss1',
      userId: 'user-1',
      content: 'Great job!',
      createdAt: new Date(),
    },
  ]);

  private _joinRequests = signal<GroupJoinRequest[]>([
    { id: 'r1', groupId: 'g2', userId: 'user-3', requestedAt: new Date() },
  ]);

  // Mock static users dictionary for fast resolution
  private _mockUsers: Record<string, { initials: string; name: string }> = {
    'user-1': { initials: 'AM', name: 'Aymane M.' },
    'user-2': { initials: 'JD', name: 'John Doe' },
    'user-3': { initials: 'AR', name: 'Alice Ray' },
  };

  public allGroups = this._groups.asReadonly();
  public myMemberships = computed(() =>
    this._memberships().filter((m) => m.userId === this.currentUserId),
  );

  public myGroups = computed(() => {
    const mems = this.myMemberships();
    const allMems = this._memberships();
    return this._groups()
      .filter((g) => mems.some((m) => m.groupId === g.id))
      .map((group) => {
        const membership = mems.find((m) => m.groupId === group.id);
        const memberCount = allMems.filter((m) => m.groupId === group.id).length;
        return { group, role: membership?.role, memberCount };
      });
  });

  public discoverGroups = computed(() => {
    const mems = this.myMemberships();
    const allMems = this._memberships();
    return this._groups()
      .filter((g) => !mems.some((m) => m.groupId === g.id))
      .map((group) => {
        const memberCount = allMems.filter((m) => m.groupId === group.id).length;
        return { group, memberCount };
      });
  });

  public createGroup(name: string, description: string, type: 'OPEN' | 'LOCKED') {
    const newGroup: Group = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      description,
      type,
    };

    const newMembership: GroupMembership = {
      id: Math.random().toString(36).substring(2, 9),
      groupId: newGroup.id,
      userId: this.currentUserId,
      role: 'ADMIN',
      joinedAt: new Date(),
    };

    this._groups.update((g) => [...g, newGroup]);
    this._memberships.update((m) => [...m, newMembership]);
  }

  public joinGroup(groupId: string) {
    const newMembership: GroupMembership = {
      id: Math.random().toString(36).substring(2, 9),
      groupId,
      userId: this.currentUserId,
      role: 'MEMBER',
      joinedAt: new Date(),
    };
    this._memberships.update((m) => [...m, newMembership]);
  }

  public requestToJoin(groupId: string) {
    console.log(`Requested to join group ${groupId}`);
    const req: GroupJoinRequest = {
      id: Math.random().toString(36).substring(2, 9),
      groupId,
      userId: this.currentUserId,
      requestedAt: new Date(),
    };
    this._joinRequests.update((r) => [...r, req]);
  }

  // --- Group Detail Additions ---

  public getGroupById(id: string): Group | undefined {
    return this._groups().find((g) => g.id === id);
  }

  public getMyRole(groupId: string) {
    return computed(() => {
      const mem = this._memberships().find(
        (m) => m.groupId === groupId && m.userId === this.currentUserId,
      );
      return mem ? mem.role : null;
    });
  }

  public leaveGroup(groupId: string) {
    this._memberships.update((mems) =>
      mems.filter((m) => !(m.groupId === groupId && m.userId === this.currentUserId)),
    );
  }

  public getGroupMembers(groupId: string) {
    return computed<MemberItem[]>(() => {
      return this._memberships()
        .filter((m) => m.groupId === groupId)
        .map((m) => {
          const u = this._mockUsers[m.userId] || { initials: '?', name: 'Unknown' };
          return {
            membershipId: m.id,
            userId: m.userId,
            userInitials: u.initials,
            fullName: u.name,
            role: m.role,
            joinedAt: m.joinedAt,
          };
        });
    });
  }

  public getGroupRequests(groupId: string) {
    return computed<RequestItem[]>(() => {
      return this._joinRequests()
        .filter((r) => r.groupId === groupId)
        .map((r) => {
          const u = this._mockUsers[r.userId] || { initials: '?', name: 'Unknown' };
          return {
            requestId: r.id,
            userId: r.userId,
            userInitials: u.initials,
            fullName: u.name,
            requestedAt: r.requestedAt,
          };
        });
    });
  }

  public getGroupFeed(groupId: string) {
    return computed<FeedSharedSession[]>(() => {
      return this._sharedSessions()
        .filter((s) => s.groupId === groupId)
        .sort((a, b) => b.sharedAt.getTime() - a.sharedAt.getTime())
        .map((s) => {
          const u = this._mockUsers[s.sharedByUserId] || { initials: '?', name: 'Unknown' };
          const sessionComments = this._comments()
            .filter((c) => c.sharedSessionId === s.id)
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map((c) => {
              const cu = this._mockUsers[c.userId] || { initials: '?', name: 'Unknown' };
              return { ...c, userInitials: cu.initials, userName: cu.name };
            });

          return {
            ...s,
            userInitials: u.initials,
            userName: u.name,
            sessionTitle: 'Mock Session Title', // Real implementation would fetch this from session service
            goalName: 'Mock Goal',
            duration: 120, // 2 hours
            status: 'COMPLETED',
            comments: sessionComments,
          };
        });
    });
  }

  public shareSession(groupId: string, sessionId: string) {
    const newShare: SharedSession = {
      id: Math.random().toString(36).substring(2, 9),
      sessionId,
      groupId,
      sharedByUserId: this.currentUserId,
      sharedAt: new Date(),
    };
    this._sharedSessions.update((s) => [newShare, ...s]);
  }

  public addComment(sharedSessionId: string, content: string) {
    const newComment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      sharedSessionId,
      userId: this.currentUserId,
      content,
      createdAt: new Date(),
    };
    this._comments.update((c) => [...c, newComment]);
  }

  public updateRole(membershipId: string, newRole: 'MEMBER' | 'ADMIN') {
    this._memberships.update((mems) =>
      mems.map((m) => (m.id === membershipId ? { ...m, role: newRole } : m)),
    );
  }

  public removeMember(membershipId: string) {
    this._memberships.update((mems) => mems.filter((m) => m.id !== membershipId));
  }

  public acceptRequest(requestId: string) {
    const req = this._joinRequests().find((r) => r.id === requestId);
    if (req) {
      // Add member
      const newMembership: GroupMembership = {
        id: Math.random().toString(36).substring(2, 9),
        groupId: req.groupId,
        userId: req.userId,
        role: 'MEMBER',
        joinedAt: new Date(),
      };
      this._memberships.update((m) => [...m, newMembership]);
      // Remove request
      this._joinRequests.update((requests) => requests.filter((r) => r.id !== requestId));
    }
  }

  public declineRequest(requestId: string) {
    this._joinRequests.update((requests) => requests.filter((r) => r.id !== requestId));
  }

  public updateGroup(groupId: string, data: Partial<Pick<Group, 'name' | 'description' | 'type'>>) {
    this._groups.update((groups) => groups.map((g) => (g.id === groupId ? { ...g, ...data } : g)));
  }

  public deleteGroup(groupId: string) {
    this._groups.update((groups) => groups.filter((g) => g.id !== groupId));
    this._memberships.update((mems) => mems.filter((m) => m.groupId !== groupId));
  }
}
