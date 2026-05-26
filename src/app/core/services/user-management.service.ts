import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type GenderType = 'MALE' | 'FEMALE' | 'OTHER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BANNED';

export interface UserFilterRequest {
  firstName?: string;
  lastName?: string;
  gender?: GenderType | '';
  email?: string;
  phone?: string;
  status?: UserStatus | '';
}

export interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  email: string;
  phone: string;
  status: UserStatus;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableInfo {
  offset: number;
  sort: SortInfo;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

export interface UsersPaginatedResponse {
  totalPages: number;
  totalElements: number;
  size: number;
  content: UserData[];
  number: number;
  sort: SortInfo;
  first: boolean;
  last: boolean;
  pageable: PageableInfo;
  numberOfElements: number;
  empty: boolean;
}

export interface UsersFilterPayload {
  request: UserFilterRequest;
  page: number;
  size: number;
}

export interface GroupForUser {
  groupName: string;
  activityRecord: number;
}

export interface ChartWeeklySessionPlanForUserRes {
  totalWeeklySession: number;
  activeWeeklySession: number;
  completedWeeklySession: number;
  incompletedWeeklySession: number;
  pendingWeeklySession: number;
}

export interface UserDetailsResponse {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderType;
  email: string;
  phone: string;
  status: UserStatus;
  groupsForUser: GroupForUser[];
  chartWeeklySessionPlanForUserRes: ChartWeeklySessionPlanForUserRes;
}

@Injectable({ providedIn: 'root' })
export class UserManagementService {
  private readonly apiUrl = `${environment.apiUrl}/admin/users`;
  private http = inject(HttpClient);

  filterUsers(payload: UsersFilterPayload) {
    return this.http.post<UsersPaginatedResponse>(`${this.apiUrl}/tables/searchUsers`, payload);
  }

  getUserDetails(userId: string) {
    return this.http.get<UserDetailsResponse>(`${this.apiUrl}/tables/userDetails?userId=${userId}`);
  }

  banUser(userId: string) {
    return this.http.patch<void>(`${this.apiUrl}/ban`, null, { params: { userId } });
  }

  unbanUser(userId: string) {
    return this.http.patch<void>(`${this.apiUrl}/unban`, null, { params: { userId } });
  }
}
