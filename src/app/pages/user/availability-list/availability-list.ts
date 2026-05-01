import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { PlanCardComponent } from '@app/components/user/availability-list/plan-card';
import { Plan } from '@app/core/models/availability.model';

@Component({
  selector: 'app-availability-list',
  standalone: true,
  imports: [RouterLink, HlmButtonImports, HlmSkeletonImports, PlanCardComponent],
  templateUrl: './availability-list.html',
})
export class AvailabilityListComponent {
  isLoading = signal(false);
  plans = signal<Plan[]>([
    {
      id: '1',
      title: 'Spring Semester 2026',
      availabilityStatus: 'ACTIVE',
      createdAt: new Date('2026-01-15T10:00:00Z').toISOString(),
    },
    {
      id: '2',
      title: 'Winter Break',
      availabilityStatus: 'DISABLED',
      createdAt: new Date('2025-12-01T14:30:00Z').toISOString(),
    },
  ]);
}
