import { Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { LucideAngularModule, Save } from 'lucide-angular';

@Component({
  selector: 'app-availability-header',
  standalone: true,
  imports: [HlmButtonImports, LucideAngularModule],
  templateUrl: './availability-header.html',
})
export class AvailabilityHeaderComponent {
  protected Save = Save;
}
