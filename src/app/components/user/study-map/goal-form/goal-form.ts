import { Component } from '@angular/core';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmInputImports } from '@spartan-ng/helm/input';

@Component({
  selector: 'app-goal-form',
  standalone: true,
  imports: [HlmLabelImports, HlmInputImports],
  templateUrl: './goal-form.html',
})
export class GoalFormComponent {}
