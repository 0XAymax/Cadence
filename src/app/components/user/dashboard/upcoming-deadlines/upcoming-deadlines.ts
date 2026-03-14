import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LucideAngularModule, AlertCircle, Clock } from 'lucide-angular';

@Component({
  selector: 'app-upcoming-deadlines',
  imports: [...HlmCardImports, LucideAngularModule],
  templateUrl: './upcoming-deadlines.html',
})
export class UpcomingDeadlines {
  readonly AlertCircle = AlertCircle;
  readonly Clock = Clock;

  readonly deadlines = [
    {
      task: 'Submit Physics Lab Report',
      goal: 'Physics Lab Report',
      dueIn: 'Due today',
      urgent: true,
    },
    {
      task: 'Complete Integration exercises',
      goal: 'Finish Calculus Module',
      dueIn: 'Due tomorrow',
      urgent: false,
    },
    { task: 'Push CS Assignment #3', goal: 'CS Assignment #3', dueIn: 'In 3 days', urgent: false },
  ];
}
