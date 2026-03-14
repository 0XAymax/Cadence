import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-group-activity',
  imports: [...HlmCardImports],
  templateUrl: './group-activity.html',
})
export class GroupActivity {
  readonly activities = [
    {
      group: 'CS Study Group',
      user: 'Sara M.',
      action: 'commented on',
      target: 'Algorithms session',
      time: '2m ago',
    },
    {
      group: 'Math Club',
      user: 'Karim B.',
      action: 'reacted to',
      target: 'Integration notes',
      time: '18m ago',
    },
    {
      group: 'Physics Team',
      user: 'Layla K.',
      action: 'shared',
      target: 'Lab Report draft',
      time: '1h ago',
    },
  ];
}
