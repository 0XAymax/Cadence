import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AvailabilityPlan, CreateAvailabilityPlan } from '../models/availability.model';

@Injectable({ providedIn: 'root' })
export class AvailabilityPlanService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/availability`;

  public createAvailabilityPlan(payload: CreateAvailabilityPlan) {
    return this.http.post<AvailabilityPlan>(`${this.apiUrl}/create`, payload);
  }
}
