import { Component, signal, ViewChild, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsHeaderComponent } from '@app/components/user/sessions/sessions-header/sessions-header';
import { SessionsCalendarComponent } from '@app/components/user/sessions/sessions-calendar/sessions-calendar';
import { SessionsListComponent } from '@app/components/user/sessions/sessions-list/sessions-list';
import { AppSession } from '@app/core/models/session.model';
import { SessionService } from '@app/core/services/session.service';

@Component({
  selector: 'app-sessions',
  standalone: true,
  imports: [
    CommonModule,
    SessionsHeaderComponent,
    SessionsCalendarComponent,
    SessionsListComponent,
  ],
  templateUrl: './sessions.html',
})
export class SessionsComponent implements OnInit {
  viewMode: 'calendar' | 'list' = 'list';
  sessionService = inject(SessionService);

  sessions = this.sessionService.allSessions.data;
  isLoadingSesions = this.sessionService.allSessions.isLoading;

  calendarSessions = computed<AppSession[]>(() => {
    const rawSessions = this.sessions() || [];
    const flat: AppSession[] = [];

    rawSessions.forEach((ws) => {
      const wDate = new Date(ws.weeklySession.startTime);
      ws.subSessions.forEach((sub) => {
        const subDateStr = wDate.toISOString().split('T')[0];
        flat.push({
          id: sub.id,
          title: ws.weeklySession.title + ' - ' + sub.subjectName,
          date: subDateStr,
          startTime: sub.startTime,
          endTime: sub.endTime,
          subjectId: sub.subjectId,
          subjectName: sub.subjectName,
          status: (sub.status === 'PENDING' ? 'PLANNED' : sub.status) as any,
          type: 'FOCUS',
        });
      });
    });
    return flat;
  });

  ngOnInit() {
    this.sessionService.loadAllSessions().subscribe();
  }

  onSlotClick(event: { dateStr: string; timeStr: string }) {
    // Generate derived end time (default to 1 hr later)
    let timeParts = event.timeStr.split(':');
    let hoursStr = timeParts[0];
    let minsStr = timeParts[1];
    let hours = parseInt(hoursStr, 10);
    let mins = parseInt(minsStr, 10);
    let endHours = (hours + 1).toString().padStart(2, '0');
    let endTimeStr = endHours + ':' + minsStr.padStart(2, '0');
  }

  onSessionClick(id: string) {
    console.log('View session ID:', id);
  }

  onSaveSession(sessionData: Partial<AppSession>) {
    console.log('Would save session via API:', sessionData);
  }

  onStartSession(id: string) {
    console.log('Starting sub-session via API, ID:', id);
    // e.g. this.sessionService.updateSubSessionStatus(id, 'IN_PROGRESS');
  }

  onCompleteSession(id: string) {
    console.log('Completing sub-session via API, ID:', id);
    // e.g. this.sessionService.updateSubSessionStatus(id, 'COMPLETED');
  }
}
