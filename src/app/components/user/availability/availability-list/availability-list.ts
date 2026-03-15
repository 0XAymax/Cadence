import { Component } from '@angular/core';
import { AvailabilityDayRowComponent } from '../availability-day-row/availability-day-row';

export interface DayAvailability {
  day: string;
  enabled: boolean;
  slots: { start: string; end: string }[];
}

@Component({
  selector: 'app-availability-list',
  standalone: true,
  imports: [AvailabilityDayRowComponent],
  templateUrl: './availability-list.html',
})
export class AvailabilityListComponent {
  weekSchedule: DayAvailability[] = [
    { day: 'Monday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Tuesday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Wednesday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Thursday', enabled: true, slots: [{ start: '09:00', end: '17:00' }] },
    { day: 'Friday', enabled: true, slots: [{ start: '09:00', end: '16:00' }] },
    { day: 'Saturday', enabled: false, slots: [] },
    { day: 'Sunday', enabled: false, slots: [] },
  ];
}
