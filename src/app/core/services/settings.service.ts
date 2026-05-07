import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  UpdateUserDataRes,
  User,
  UpdateProfilePayload,
  ProfilePictureResponse,
} from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly userUtl = `${environment.apiUrl}/users`;
  private http = inject(HttpClient);

  getUserProfile() {
    return this.http.get<User>(`${this.userUtl}/profile`);
  }

  updateUserProfile(data: UpdateProfilePayload) {
    return this.http.patch<UpdateUserDataRes>(`${this.userUtl}/update`, data);
  }

  uploadProfilePic(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.patch<ProfilePictureResponse>(`${this.userUtl}/changePFP`, formData);
  }
}
