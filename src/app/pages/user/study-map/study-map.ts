import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { SubjectCardComponent } from '@app/components/user/study-map/subject-card/subject-card';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { SubjectFormComponent } from '@app/components/user/study-map/subject-form/subject-form';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { SubjectService } from '@app/core/services/subject.service';

export interface SubjTask {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  completed: boolean;
}

@Component({
  selector: 'app-study-map',
  standalone: true,
  imports: [
    CommonModule,
    HlmButtonImports,
    LucideAngularModule,
    SubjectCardComponent,
    HlmSheetImports,
    SubjectFormComponent,
    HlmCardImports,
  ],
  templateUrl: './study-map.html',
})
export class StudyMapComponent {
  protected Plus = Plus;
  private subjectService = inject(SubjectService);
  readonly subjects = this.subjectService.allSubjects.data;
  readonly isSubjectsLoading = this.subjectService.allSubjects.isLoading;
  ngOnInit() {
    this.subjectService.loadAllSubjects().subscribe();
  }
  expandedSubjectId: string | null = null;

  toggleSubject(subjectId: string) {
    if (this.expandedSubjectId === subjectId) {
      this.expandedSubjectId = null;
    } else {
      this.expandedSubjectId = subjectId;
    }
  }
}
