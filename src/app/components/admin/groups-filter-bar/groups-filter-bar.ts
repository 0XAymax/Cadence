import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GroupFilterRequest, PrivacyLevel } from '@app/core/services/groups-management.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-groups-filter-bar',
  imports: [
    ReactiveFormsModule,
    ...HlmInputImports,
    ...HlmLabelImports,
    ...HlmSelectImports,
    ...HlmButtonImports,
  ],
  template: `
    <div class="bg-card border border-border rounded-lg p-6 mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <!-- Group Name -->
        <div class="flex flex-col gap-2">
          <label hlmLabel for="groupName" class="text-sm font-medium">Group Name</label>
          <input
            hlmInput
            id="groupName"
            type="text"
            placeholder="Search by group name..."
            [formControl]="nameCtrl"
          />
        </div>

        <!-- Privacy Level -->
        <div class="flex flex-col gap-2">
          <label hlmLabel for="privacyLevel" class="text-sm font-medium">Privacy Level</label>
          <select hlmSelect id="privacyLevel" [formControl]="privacyLevelCtrl">
            @for (option of privacyOptions; track option.value) {
              <option [value]="option.value">{{ option.label }}</option>
            }
          </select>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 justify-end">
        <button hlmBtn variant="outline" (click)="onReset()">Reset</button>
        <button hlmBtn (click)="onFilter()">Search</button>
      </div>
    </div>
  `,
})
export class GroupsFilterBarComponent {
  filterSubmitted = output<GroupFilterRequest>();

  nameCtrl = new FormControl<string>('');
  privacyLevelCtrl = new FormControl<PrivacyLevel | ''>('');

  privacyOptions: { label: string; value: PrivacyLevel | '' }[] = [
    { label: 'All Levels', value: '' },
    { label: 'Public', value: 'PUBLIC' },
    { label: 'Private', value: 'PRIVATE' },
  ];

  onFilter() {
    const filterRequest: GroupFilterRequest = {
      name: this.nameCtrl.value ?? '',
      privacyLevel: this.privacyLevelCtrl.value ?? '',
    };
    this.filterSubmitted.emit(filterRequest);
  }

  onReset() {
    this.nameCtrl.reset('');
    this.privacyLevelCtrl.reset('');
    this.onFilter();
  }
}
