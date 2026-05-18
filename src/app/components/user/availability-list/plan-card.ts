import { Component, input , ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Plan } from '@app/core/models/availability.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-plan-card',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <a
      [routerLink]="['/user/availability-plan', plan().id]"
      class="group flex cursor-pointer items-center justify-between px-4 py-3 transition-colors duration-150 hover:bg-muted/40 focus:outline-none focus-visible:bg-muted/40"
    >
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-sm font-semibold text-foreground">{{ plan().title }}</span>
          
          @if (plan().availabilityStatus === 'ACTIVE') {
            <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-green-500/10 text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
              Active
            </span>
          } @else {
            <span class="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-muted text-muted-foreground ring-1 ring-inset ring-border/50">
              {{ plan().availabilityStatus }}
            </span>
          }
        </div>
        <p class="mt-1 text-xs text-muted-foreground/70">
          Created on {{ plan().createdAt | date: 'mediumDate' }}
        </p>
      </div>

      <!-- Right: Action chevron -->
      <div class="flex shrink-0 items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 shrink-0 text-muted-foreground/50 transition-colors duration-200 group-hover:text-foreground"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
    </a>
  `,
})
export class PlanCardComponent {
  readonly plan = input.required<Plan>();
}
