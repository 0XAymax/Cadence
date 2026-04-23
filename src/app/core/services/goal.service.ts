import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { CreateGoalRequest, Goal } from '../models/goal.model';
import { createQuery } from '../utils/query.helper';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GoalService {
  private http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/goal`;
  readonly allGoals = createQuery<Goal[]>([]);

  public loadAllGoals(subjectId: string) {
    return this.allGoals.load(this.http.get<Goal[]>(`${this.url}/all/${subjectId}`));
  }

  public createSubjectGoal(payload: CreateGoalRequest, subjectId: string) {
    return this.http.post<Goal>(`${this.url}/create/${subjectId}`, payload).pipe(
      tap((newGoal) => {
        this.allGoals.mutate((goals) => [...goals, newGoal]);
      }),
    );
  }
}
