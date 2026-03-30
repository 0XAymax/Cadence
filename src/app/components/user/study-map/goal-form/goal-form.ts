import { Component, computed, input, signal } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { GoalWithoutSubject } from '@app/core/models/goal.model';
import { form, required, FormRoot, FormField } from '@angular/forms/signals';

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
    FormField
],
  templateUrl: './goal-form.html',
})
export class GoalFormComponent {
  protected Plus = Plus;
  readonly SubjectName = input.required<string>();
  readonly subjectId = input.required<string>();

  goalModel = signal<GoalWithoutSubject>({
    title: '',
    hours: 0,
    deadline: new Date(),
  });

  goalForm = form(this.goalModel, (schema) =>{
    required(schema.title);
    required(schema.hours);
    required(schema.deadline);
  }, {
    submission: {
      action: async() => {
        const credentials = {...this.goalModel(), subjectId : this.subjectId()};
        console.log("Submitted goal",credentials);
      }
    }
  })

}
