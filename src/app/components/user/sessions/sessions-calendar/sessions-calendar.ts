import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSessionResponse, CreateSubSessionResponse } from '@app/core/models/session.model';
import {
  getMonday,
  getWeekDays,
  getTimeSlots,
  computeBlockStyles,
  getSubjectColor,
} from './calendar.utils';
import { LucideAngularModule, ChevronLeft, ChevronRight, CalendarOff } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-sessions-calendar',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, HlmButtonImports],
  templateUrl: './session-calendar.html',
})
export class SessionsCalendarComponent {
  sessions = input<CreateSessionResponse[]>([]);

  // Local state purely for navigation tracking
  currentWeekStart = signal<Date>(getMonday(new Date()));

  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly CalendarOff = CalendarOff;

  weekDays = computed(() => getWeekDays(this.currentWeekStart()));
  timeSlots = getTimeSlots();

  /**
   * Tries to find a session where the weeklySession.startTime
   * falls into the currently viewed week's Monday
   */
  matchingSession = computed(() => {
    const targetTime = this.currentWeekStart().getTime();
    return this.sessions().find((s) => {
      // Parses weekly start timestamp to find its relative Monday
      if (!s.weeklySession.startTime) return false;
      const sessionDate = new Date(s.weeklySession.startTime);
      return getMonday(sessionDate).getTime() === targetTime;
    });
  });

  /** Group SubSessions by Day cleanly */
  subSessionsByDay = computed(() => {
    const session = this.matchingSession();
    const grouped: Record<string, CreateSubSessionResponse[]> = {
      MONDAY: [],
      TUESDAY: [],
      WEDNESDAY: [],
      THURSDAY: [],
      FRIDAY: [],
      SATURDAY: [],
      SUNDAY: [],
    };

    if (session) {
      session.subSessions.forEach((sub) => {
        if (grouped[sub.dayOfWeek]) {
          grouped[sub.dayOfWeek].push(sub);
        }
      });
    }
    return grouped;
  });

  getStyle(start: string, end: string) {
    return computeBlockStyles(start, end);
  }

  getColorClass(subjectId: string) {
    return getSubjectColor(subjectId);
  }

  previousWeek() {
    const newWeek = new Date(this.currentWeekStart());
    newWeek.setDate(newWeek.getDate() - 7);
    this.currentWeekStart.set(newWeek);
  }

  nextWeek() {
    const newWeek = new Date(this.currentWeekStart());
    newWeek.setDate(newWeek.getDate() + 7);
    this.currentWeekStart.set(newWeek);
  }
}
