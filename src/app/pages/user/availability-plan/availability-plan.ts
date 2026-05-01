import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanHeaderComponent } from '../../../components/user/availability-plan/plan-header/plan-header';
import {
  WeeklyGridComponent,
  SlotRange,
} from '../../../components/user/availability-plan/weekly-grid/weekly-grid';
import { PageActionsBarComponent } from '../../../components/user/availability-plan/page-actions-bar/page-actions-bar';

@Component({
  selector: 'app-availability-plan',
  templateUrl: './availability-plan.html',
  standalone: true,
  imports: [CommonModule, PlanHeaderComponent, WeeklyGridComponent, PageActionsBarComponent],
})
export class AvailibilityPlan {
  planConfig = {
    title: '',
    status: 'ACTIVE' as 'ACTIVE' | 'DISABLED',
  };

  slots: SlotRange[] = [];

  onConfigChanged(config: { title: string; status: 'ACTIVE' | 'DISABLED' }) {
    this.planConfig = config;
  }

  onGridUpdated(slots: SlotRange[]) {
    this.slots = slots;
  }

  onReset() {
    console.log('Reset triggered');
    // Will need to reach into WeeklyGridComponent via @ViewChild to reset,
    // or re-bind grid state via inputs.
  }

  onSave() {
    console.log('Saving Plan:', {
      plan: this.planConfig,
      slots: this.slots,
    });
  }
}
