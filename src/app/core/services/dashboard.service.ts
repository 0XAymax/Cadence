import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface DashboardCardsData {
  registredUsersCount: number;
  weeklyPlanCount: number;
  groupsCount: number;
  subjectsCount: number;
}

export interface SubSessionData {
  dayOfWeek: string;
  startTime: string;
}

export interface StackedAreaChartData {
  completedSubSession: SubSessionData[];
  pendingSubSession: SubSessionData[];
  incompletedSubSession: SubSessionData[];
}

export interface DoughnutChartData {
  highPSubject: number;
  mediumPSubject: number;
  lowPSubject: number;
}

export interface HeatmapSubSessionData {
  creationHour: string;
  subSessionCount: number;
}

export interface HeatmapDayData {
  dayOfWeek: string;
  subSessionData: HeatmapSubSessionData[];
}

export interface HeatmapChartData {
  localDateTime: string;
  heatMapChartData: HeatmapDayData[];
}

export interface HeatmapRequestPayload {
  weekNumber: number;
  year: number;
}

export interface TopGroupData {
  name: string;
  groupPrivacy: 'PUBLIC' | 'PRIVATE';
  memberscount: number;
}

export interface MFAActivityData {
  username: string;
  type: 'NONE' | string;
  attempts: number;
  time: string;
  isUsed: boolean;
}

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly apiUrl = `${environment.apiUrl}/admin/dashboard`;
  private http = inject(HttpClient);

  getCardsData() {
    return this.http.get<DashboardCardsData>(`${this.apiUrl}/cards`);
  }

  getStackedAreaChartData() {
    return this.http.get<StackedAreaChartData>(`${this.apiUrl}/charts/stackedArea`);
  }

  getDoughnutChartData() {
    return this.http.get<DoughnutChartData>(`${this.apiUrl}/charts/doughnut`);
  }

  getHeatmapChartData(payload: HeatmapRequestPayload) {
    return this.http.post<HeatmapChartData>(`${this.apiUrl}/charts/heatMap`, payload);
  }

  getTopGroups() {
    return this.http.get<TopGroupData[]>(`${this.apiUrl}/tables/topGroups`);
  }

  getMFAActivities() {
    return this.http.get<MFAActivityData[]>(`${this.apiUrl}/tables/mfaActivities`);
  }
}
