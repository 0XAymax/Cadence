import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { UserFilterRequest, GenderType, UserStatus } from '@app/core/services/user-management.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users-filter-bar',
  imports: [
    ReactiveFormsModule,
    ...HlmInputImports,
    ...HlmLabelImports,
    ...HlmSelectImports,
    ...HlmButtonImports,
  ],
  templateUrl: './users-filter-bar.html',
})
export class UsersFilterBarComponent {
  filterSubmitted = output<UserFilterRequest>();

  firstNameCtrl = new FormControl<string>('');
  lastNameCtrl = new FormControl<string>('');
  genderCtrl = new FormControl<GenderType | ''>('');
  emailCtrl = new FormControl<string>('');
  phoneCtrl = new FormControl<string>('');
  statusCtrl = new FormControl<UserStatus | ''>('');

  genderOptions: { label: string; value: GenderType | '' }[] = [
    { label: 'All Genders', value: '' },
    { label: 'Male', value: 'MALE' },
    { label: 'Female', value: 'FEMALE' },
  ];

  statusOptions: { label: string; value: UserStatus | '' }[] = [
    { label: 'All Statuses', value: '' },
    { label: 'Active', value: 'ACTIVE' },
    { label: 'Banned', value: 'BANNED' },
  ];

  onFilter() {
    const filterRequest: UserFilterRequest = {
      firstName: this.firstNameCtrl.value || undefined,
      lastName: this.lastNameCtrl.value || undefined,
      gender: this.genderCtrl.value || undefined,
      email: this.emailCtrl.value || undefined,
      phone: this.phoneCtrl.value || undefined,
      status: this.statusCtrl.value || undefined,
    };
    this.filterSubmitted.emit(filterRequest);
  }

  onReset() {
    this.firstNameCtrl.reset('');
    this.lastNameCtrl.reset('');
    this.genderCtrl.reset('');
    this.emailCtrl.reset('');
    this.phoneCtrl.reset('');
    this.statusCtrl.reset('');
    this.onFilter();
  }
}
