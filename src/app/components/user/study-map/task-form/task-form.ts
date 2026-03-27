import { Component } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [HlmLabelImports, HlmInputImports],
  templateUrl: './task-form.html',
})
export class TaskFormComponent {}
