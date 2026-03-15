import { Component } from '@angular/core';
import { AvailabilityHeaderComponent } from '../../../components/user/availability/availability-header/availability-header';
import { AvailabilityListComponent } from '../../../components/user/availability/availability-list/availability-list';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [AvailabilityHeaderComponent, AvailabilityListComponent],
  templateUrl: './availability.html',
})
export class AvailabilityComponent {}
