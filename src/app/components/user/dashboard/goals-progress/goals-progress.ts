import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-goals-progress',
  imports: [...HlmCardImports],
  templateUrl: './goals-progress.html',
})
export class GoalsProgress {
  readonly goals = [
    { title: 'Finish Calculus Module', progress: 72, tasks: '8/11 tasks' },
    { title: 'Physics Lab Report', progress: 40, tasks: '4/10 tasks' },
    { title: 'CS Assignment #3', progress: 90, tasks: '9/10 tasks' },
  ];
}
