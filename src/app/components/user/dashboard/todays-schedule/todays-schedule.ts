import { Component } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';

@Component({
  selector: 'app-todays-schedule',
  imports: [...HlmCardImports],
  templateUrl: './todays-schedule.html',
})
export class TodaysSchedule {
  readonly sessions = [
    {
      subject: 'Mathematics',
      topic: 'Calculus — Integration',
      time: '09:00',
      duration: '90 min',
      color: 'bg-primary',
    },
    {
      subject: 'Physics',
      topic: 'Waves & Oscillations',
      time: '11:00',
      duration: '60 min',
      color: 'bg-secondary',
    },
    {
      subject: 'Computer Science',
      topic: 'Data Structures',
      time: '14:00',
      duration: '120 min',
      color: 'bg-primary',
    },
    {
      subject: 'English',
      topic: 'Essay Writing',
      time: '16:30',
      duration: '45 min',
      color: 'bg-secondary',
    },
  ];
}
