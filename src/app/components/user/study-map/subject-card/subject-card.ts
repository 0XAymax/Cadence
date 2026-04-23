import { Component, inject, input, output, signal } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LucideAngularModule, ChevronDown, ChevronRight, MoreVertical, Plus } from 'lucide-angular';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { CommonModule } from '@angular/common';
import { GoalItemComponent } from '../goal-item/goal-item';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { GoalFormComponent } from '../goal-form/goal-form';
import { Goal } from '@app/core/models/goal.model';
import { SubjectModel } from '@app/core/models/subject.model';
import { GoalService } from '@app/core/services/goal.service';

@Component({
  selector: 'app-subject-card',
  standalone: true,
  imports: [
    CommonModule,
    HlmCardImports,
    HlmButtonImports,
    LucideAngularModule,
    HlmBadgeImports,
    HlmDropdownMenuImports,
    GoalItemComponent,
    HlmSheetImports,
    GoalFormComponent,
    LucideAngularModule,
  ],
  templateUrl: './subject-card.html',
})
export class SubjectCardComponent {
  private goalService = inject(GoalService);
  subject = input.required<SubjectModel>();
  isExpanded = input<boolean>(false);
  toggleExpand = output<void>();

  protected ChevronDown = ChevronDown;
  protected ChevronRight = ChevronRight;
  protected MoreVertical = MoreVertical;
  protected Plus = Plus;
  readonly goals = this.goalService.allGoals.data;
  readonly isLoadingGoals = this.goalService.allGoals.isLoading;

  expandedGoalId: string | null = null;

  ngOnInit() {
    this.goalService.loadAllGoals(this.subject().id).subscribe();
  }

  toggleGoal(goalId: string) {
    if (this.expandedGoalId === goalId) {
      this.expandedGoalId = null;
    } else {
      this.expandedGoalId = goalId;
    }
  }

  getBorderColor() {
    switch (this.subject().priority) {
      case 'HIGH':
        return 'border-l-destructive';
      case 'MEDIUM':
        return 'border-l-amber-500';
      case 'LOW':
        return 'border-l-blue-500';
      default:
        return 'border-l-border';
    }
  }

  getBadgeVariant() {
    switch (this.subject().priority) {
      case 'HIGH':
        return 'destructive';
      case 'MEDIUM':
        return 'secondary';
      case 'LOW':
        return 'outline';
      default:
        return 'default';
    }
  }
}
