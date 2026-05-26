import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { GroupsFilterBarComponent } from '@app/components/admin/groups-filter-bar/groups-filter-bar';
import { GroupsListComponent } from '@app/components/admin/groups-list/groups-list';
import {
  GroupsManagementService,
  GroupFilterRequest,
  GroupData,
  GroupsFilterPayload,
} from '@app/core/services/groups-management.service';
import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-groups',
  imports: [GroupsFilterBarComponent, GroupsListComponent],
  template: `
    <div class="min-h-screen bg-background p-6 md:p-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-foreground">Groups Management</h1>
        <p class="text-muted-foreground mt-2">Search and manage platform groups</p>
      </div>

      <!-- Filter Bar -->
      <app-groups-filter-bar (filterSubmitted)="onFilterSubmitted($event)" />

      <!-- Groups List -->
      <app-groups-list
        [groupsList]="groupsList()"
        [isLoading]="isLoading()"
        (groupSelected)="onGroupSelected($event)"
      />
    </div>
  `,
})
export class AdminGroups {
  private readonly groupsManagementService = inject(GroupsManagementService);

  groupsList = signal<GroupData[] | null>(null);
  isLoading = signal<boolean>(false);
  currentFilter = signal<GroupFilterRequest>({
    name: '',
    privacyLevel: '',
  });

  private readonly PAGE_SIZE = 20;

  constructor() {
    effect(() => this.loadGroups());
  }

  onFilterSubmitted(filter: GroupFilterRequest) {
    this.currentFilter.set(filter);
  }

  private loadGroups() {
    this.isLoading.set(true);

    const payload: GroupsFilterPayload = {
      groupData: this.currentFilter(),
      page: 1,
      size: this.PAGE_SIZE,
    };

    this.groupsManagementService.searchGroups(payload).subscribe({
      next: (data) => {
        this.groupsList.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        toast.error('Failed to load groups', {
          description: 'Unable to fetch groups data',
        });
        this.isLoading.set(false);
      },
    });
  }

  onGroupSelected(groupId: string) {
    // TODO: Open group details modal
    toast.info(`Group selected: ${groupId}`);
  }
}