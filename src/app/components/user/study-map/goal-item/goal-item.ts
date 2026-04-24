import { Component, Input, Output, EventEmitter, input, output, signal, inject } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import {
  LucideAngularModule,
  ChevronDown,
  ChevronRight,
  MoreVertical,
  Plus,
  Calendar,
  Clock,
} from 'lucide-angular';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { TaskFormComponent } from '../task-form/task-form';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { Goal, Task } from '@app/core/models/goal.model';
import { GoalService } from '@app/core/services/goal.service';

@Component({
  selector: 'app-goal-item',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonImports,
    LucideAngularModule,
    HlmBadgeImports,
    TaskItemComponent,
    HlmSheetImports,
    TaskFormComponent,
    HlmDropdownMenuImports,
    HlmProgressImports,
  ],
  templateUrl: './goal-item.html',
})
export class GoalItemComponent {
  goalService = inject(GoalService);
  goal = input.required<Goal>();
  isExpanded = input<boolean>(false);
  toggleExpand = output<void>();
  tasks = this.goalService.allTasks.data;
  isLoadingTasks = this.goalService.allTasks.isLoading;

  ngOnInit() {
    this.goalService.loadAllTasks(this.goal().id).subscribe();
  }

  protected ChevronDown = ChevronDown;
  protected ChevronRight = ChevronRight;
  protected MoreVertical = MoreVertical;
  protected Plus = Plus;
  protected Calendar = Calendar;
  protected Clock = Clock;
}
