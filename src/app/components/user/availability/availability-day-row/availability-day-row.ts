import { Component, Input } from '@angular/core';
import { DayAvailability } from '../availability-list/availability-list';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { LucideAngularModule, Plus, Trash2 } from 'lucide-angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-availability-day-row',
  standalone: true,
  imports: [HlmSwitchImports, HlmButtonImports, HlmInputImports, LucideAngularModule, FormsModule],
  templateUrl: './availability-day-row.html',
})
export class AvailabilityDayRowComponent {
  @Input() daySchedule!: DayAvailability;

  protected Plus = Plus;
  protected Trash2 = Trash2;

  addSlot() {
    this.daySchedule.slots.push({ start: '09:00', end: '17:00' });
  }

  removeSlot(index: number) {
    this.daySchedule.slots.splice(index, 1);
  }
}
