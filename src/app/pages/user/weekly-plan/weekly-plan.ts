import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { GenerateWeekDialogComponent } from '@app/components/user/weekly-plan/generate-week-dialog/generate-week-dialog';
import { GoalProgressInfo } from '@app/core/models/weekly-plan.model';

@Component({
  selector: 'app-weekly-plan',
  standalone: true,
  imports: [
    CommonModule,
    HlmTabsImports,
    HlmButtonImports,
    HlmCardImports,
    GenerateWeekDialogComponent,
  ],
  templateUrl: './weekly-plan.html',
})
export class WeeklyPlanComponent {
  dialogState = signal<'open' | 'closed'>('closed');

  goals = signal<GoalProgressInfo[]>([
    {
      id: 'g1',
      goalTitle: 'Master Angular Signals',
      subjectName: 'Frontend Frameworks',
      hoursPlannedCurrentWeek: 4,
      targetHoursPerWeek: 5,
    },
    {
      id: 'g2',
      goalTitle: 'Database Optimization',
      subjectName: 'Backend Engineering',
      hoursPlannedCurrentWeek: 2,
      targetHoursPerWeek: 4,
    },
  ]);
}
