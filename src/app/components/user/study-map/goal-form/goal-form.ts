import { Component, computed, inject, input, signal } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { CreateGoalRequest, GoalWithoutSubject } from '@app/core/models/goal.model';
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
  readonly SubjectName = input.required<string>();
  readonly subjectId = input.required<string>();
  private goalService = inject(GoalService);

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
      toast.success('Subject created successfully', {
        description: 'The new subject has been added to your study map.',
      });
    },
    onError: () => {
      toast.success('Subject created successfully', {
        description: 'The new subject has been added to your study map.',
      });
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
          const credentials = this.goalModel();
          this.createGoalMutation.mutate(credentials);
        },
      },
    },
  );
}
