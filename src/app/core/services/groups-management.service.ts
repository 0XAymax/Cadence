import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export type PrivacyLevel = 'PUBLIC' | 'PRIVATE';

export interface GroupFilterRequest {
  name: string;
  privacyLevel: PrivacyLevel | '';
}

export interface GroupData {
  id: string;
  name: string;
  privacyLevel: PrivacyLevel;
}

export interface GroupsFilterPayload {
  groupData: GroupFilterRequest;
  page: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class GroupsManagementService {
  private readonly apiUrl = `${environment.apiUrl}/admin/groups`;
  private http = inject(HttpClient);

  searchGroups(payload: GroupsFilterPayload) {
    return this.http.post<GroupData[]>(`${this.apiUrl}/tables/searchGroups`, payload);
  }
}
