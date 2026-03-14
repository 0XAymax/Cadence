import { Component } from '@angular/core';
import { LucideAngularModule, BookOpen, Target, Clock, CheckCheck } from 'lucide-angular';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-stats-cards',
  imports: [LucideAngularModule, ...HlmCardImports],
  templateUrl: './stats-cards.html',
})
export class StatsCards {
  readonly stats = [
    { label: 'Active Subjects', value: '6', icon: BookOpen, delta: '+1 this week' },
    { label: 'Goals In Progress', value: '4', icon: Target, delta: '2 due soon' },
    { label: 'Study Hours', value: '12h', icon: Clock, delta: 'this week' },
    { label: 'Tasks Completed', value: '18', icon: CheckCheck, delta: 'this week' },
  ];
}
