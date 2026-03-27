import { Component } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-subject-form',
  standalone: true,
  imports: [HlmLabelImports, HlmInputImports],
  templateUrl: './subject-form.html',
})
export class SubjectFormComponent {}
