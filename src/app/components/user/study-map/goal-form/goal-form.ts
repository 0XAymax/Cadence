import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { LucideAngularModule, Plus } from 'lucide-angular';
import {
  CreateGoalRequest,
  Goal,
  UpdateGoalRequest,
} from '@app/core/models/goal.model';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';
import { createMutation } from '@app/core/utils/mutation.helper';
import { GoalService } from '@app/core/services/goal.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [
    HlmLabelImports,
    HlmInputImports,
    HlmButtonImports,
    HlmSheetImports,
    LucideAngularModule,
    FormRoot,
    FormField,
  ],
  templateUrl: './goal-form.html',
})
export class GoalFormComponent {
  protected Plus = Plus;
  readonly SubjectName = input<string>();
  readonly subjectId = input<string>('');
  readonly goal = input<Goal>();

  private goalService = inject(GoalService);

  constructor() {
    effect(() => {
      const existing = this.goal();
      if (existing) {
        this.goalModel.set({
          title: existing.title,
          targetHoursPerWeek: existing.targetHoursPerWeek,
          deadline: new Date(existing.deadline),
          progress: existing.progress,
        });
      }
    });
  }

  goalModel = signal<CreateGoalRequest>({
    title: '',
    targetHoursPerWeek: 0,
    deadline: new Date(),
    progress: 0,
  });

  readonly createGoalMutation = createMutation({
    mutationFn: (payload: CreateGoalRequest) =>
      this.goalService.createSubjectGoal(payload, this.subjectId()),
    onSuccess: () => {
      toast.success('Goal created successfully', {
        description: 'The new goal has been added to your subject.',
      });
    },
    onError: (error) => {
      toast.error('Failed to create goal', {
        description: error,
      });
      console.error('Failed to create goal :', error);
    },
  });

  readonly updateGoalMutation = createMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGoalRequest }) =>
      this.goalService.updateGoal(id, payload),
    onSuccess: () => {
      toast.success('Goal updated successfully', {
        description: 'Your goal details have been updated.',
      });
    },
    onError: (error) => {
      toast.error('Failed to update goal', {
        description: error,
      });
      console.error('Failed to update goal :', error);
    },
  });

  goalForm = form(
    this.goalModel,
    (schema) => {
      required(schema.title);
      required(schema.targetHoursPerWeek);
      required(schema.deadline);
    },
    {
      submission: {
        action: async () => {
          const payload = this.goalModel();
          const existing = this.goal();

          if (existing) {
            this.updateGoalMutation.mutate({ id: existing.id, payload });
          } else {
            this.createGoalMutation.mutate(payload);
          }
        },
      },
    },
  );
}
