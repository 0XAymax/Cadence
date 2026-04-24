import { Component, effect, inject, input, signal } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';
import {
  CreateSubjectRequest,
  SubjectModel,
  SubjectPriority,
  UpdateSubjectRequest,
} from '@app/core/models/subject.model';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { SubjectService } from '@app/core/services/subject.service';
import { createMutation } from '@app/core/utils/mutation.helper';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [
    HlmLabelImports,
    HlmInputImports,
    FormField,
    FormRoot,
    HlmButtonImports,
    HlmSheetImports,
  ],
  templateUrl: './subject-form.html',
})
export class SubjectFormComponent {
  subject = input<SubjectModel>();

  subjectModel = signal<CreateSubjectRequest>({
    name: '',
    description: '',
    priority: SubjectPriority.LOW,
  });

  private readonly subjectService = inject(SubjectService);

  constructor() {
    effect(
      () => {
        const existing = this.subject();
        if (existing) {
          this.subjectModel.set({
            name: existing.name,
            description: existing.description,
            priority: existing.priority,
          });
        }
      },
    );
  }

  readonly createSubjectMutation = createMutation({
    mutationFn: (payload: CreateSubjectRequest) => this.subjectService.createSubject(payload),
    onSuccess: () => {
      toast.success('Subject created successfully', {
        description: 'The new subject has been added to your study map.',
      });
    },
    onError: (err) => {
      toast.error('Failed to create subject', {
        description: 'An error occurred while creating the subject. Please try again.',
      });
      console.error('Failed to create subject', err);
    },
  });

  readonly updateSubjectMutation = createMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSubjectRequest }) =>
      this.subjectService.updateSubject(id, payload),
    onSuccess: () => {
      toast.success('Subject updated successfully', {
        description: 'Your subject details have been updated.',
      });
    },
    onError: (err) => {
      toast.error('Failed to update subject', {
        description: 'An error occurred while updating the subject. Please try again.',
      });
      console.error('Failed to update subject', err);
    },
  });

  subjectForm = form(
    this.subjectModel,
    (schema) => {
      required(schema.name, { message: 'Subject name is required' });
      required(schema.priority, { message: 'Subject priority is required' });
    },
    {
      submission: {
        action: async () => {
          const payload = this.subjectModel();
          const existing = this.subject();

          if (existing) {
            this.updateSubjectMutation.mutate({ id: existing.id, payload });
          } else {
            this.createSubjectMutation.mutate(payload);
          }
        },
      },
    },
  );
}
