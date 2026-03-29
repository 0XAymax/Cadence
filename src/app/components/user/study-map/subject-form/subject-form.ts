import { Component, signal } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import { SubjectData, SubjectPriority } from '@app/core/models/subject.model';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [HlmLabelImports, HlmInputImports, FormField, FormRoot, HlmButtonImports, HlmSheetImports],
  templateUrl: './subject-form.html',
})
export class SubjectFormComponent {
  subjectModel = signal<SubjectData>({
    subjectName: '',
    subjectDescription: '',
    subjectPriority: SubjectPriority.LOW,
  });

  subjectForm = form(
    this.subjectModel,
    (schema) => {
      required(schema.subjectName, { message: 'Subject name is required' });
      required(schema.subjectDescription, { message: 'Description is required' });
      required(schema.subjectPriority, { message: 'Subject priority is required' });
    },
    {
      submission: {
        action: async () => {
          const credentials = this.subjectModel;
          console.log('Subject submitted', credentials());
        },
      },
    },
  );
}
