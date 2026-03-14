import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-subjects-header',
  imports: [
    LucideAngularModule,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmLabelImports,
    ...HlmSheetImports,
  ],
  templateUrl: './subjects-header.html',
})
export class SubjectsHeader {
  readonly Plus = Plus;
}
