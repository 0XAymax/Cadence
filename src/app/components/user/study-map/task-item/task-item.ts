import { Component, computed, input } from '@angular/core';
import { SubjTask } from '../../../../pages/user/study-map/study-map';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LucideAngularModule, MoreVertical, Clock } from 'lucide-angular';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { CommonModule } from '@angular/common';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { Task } from '@app/core/models/goal.model';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonImports,
    LucideAngularModule,
    HlmBadgeImports,
    HlmCheckboxImports,
    HlmDropdownMenuImports,
  ],
  templateUrl: './task-item.html',
})
export class TaskItemComponent {
  task = input.required<Task>();
  completed = computed(() => this.task().status == 'COMPLETED');

  protected MoreVertical = MoreVertical;
  protected Clock = Clock;

  toggleCompletion() {

  }
}
