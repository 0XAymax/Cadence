import { Component } from '@angular/core';
import { StatsCards } from '../../../components/user/dashboard/stats-cards/stats-cards';
import { TodaysSchedule } from '../../../components/user/dashboard/todays-schedule/todays-schedule';
import { GoalsProgress } from '../../../components/user/dashboard/goals-progress/goals-progress';
import { GroupActivity } from '../../../components/user/dashboard/group-activity/group-activity';
import { UpcomingDeadlines } from '../../../components/user/dashboard/upcoming-deadlines/upcoming-deadlines';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LucideAngularModule, Sparkles } from 'lucide-angular';

@Component({
  selector: 'app-dashboard',
  imports: [
    StatsCards,
    TodaysSchedule,
    GoalsProgress,
    GroupActivity,
    UpcomingDeadlines,
    LucideAngularModule,
    ...HlmButtonImports,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  readonly Sparkles = Sparkles;
}
