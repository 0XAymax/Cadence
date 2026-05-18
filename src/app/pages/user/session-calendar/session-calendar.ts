import { Component, inject, signal, ChangeDetectionStrategy, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '@app/core/services/session.service';
import { SessionsCalendarComponent } from '@app/components/user/sessions/sessions-calendar/sessions-calendar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingSpinnerComponent } from '@app/components/shared/loading-spinner/loading-spinner.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-session-calendar-page',
  templateUrl: './session-calendar.html',
  imports: [CommonModule, SessionsCalendarComponent, LoadingSpinnerComponent],
})
export class SessionCalendarComponent {
  readonly sessionService = inject(SessionService);
  route = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  sessionId = signal<string | null>(null);
  sessionDetails = this.sessionService.sessionDetails.data;
  isLoading = this.sessionService.sessionDetails.isLoading;

  ngOnInit() {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.sessionId.set(id);
        this.loadSession(id);
      }
    });
  }

  loadSession(id: string) {
    this.sessionService
      .loadSessionDetails(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  getWeekLabel(weekYear: number, weekNumber: number): string {
    const jan4 = new Date(weekYear, 0, 4);
    const day = jan4.getDay();
    const diffToMonday = jan4.getDate() - day + (day === 0 ? -6 : 1);
    const startOfFirstWeek = new Date(weekYear, 0, diffToMonday);

    const weekStart = new Date(startOfFirstWeek);
    weekStart.setDate(weekStart.getDate() + (weekNumber - 1) * 7);

    return `Week of ${weekStart.toLocaleString(undefined, { month: 'long' })} ${weekStart.getDate()}, ${weekStart.getFullYear()}`;
  }
}
