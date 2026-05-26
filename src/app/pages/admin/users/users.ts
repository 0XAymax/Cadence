import { Component, ChangeDetectionStrategy, inject, signal, effect } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { UsersFilterBarComponent } from '@app/components/admin/users-filter-bar/users-filter-bar';
import { UsersListComponent } from '@app/components/admin/users-list/users-list';
import { UsersDetailModalComponent } from '@app/components/admin/users-detail-modal/users-detail-modal';
import {
  UserManagementService,
  UserFilterRequest,
  UsersPaginatedResponse,
  UsersFilterPayload,
} from '@app/core/services/user-management.service';
import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-users',
  imports: [UsersFilterBarComponent, UsersListComponent],
  templateUrl: './users.html',
})
export class AdminUsers {
  private readonly userManagementService = inject(UserManagementService);
  private readonly dialog = inject(Dialog);

  paginatedData = signal<UsersPaginatedResponse | null>(null);
  isLoading = signal<boolean>(false);
  currentFilter = signal<UserFilterRequest>({});
  currentPage = signal<number>(0);

  private readonly PAGE_SIZE = 10;

  constructor() {
    effect(() => this.loadUsers());
  }

  onFilterSubmitted(filter: UserFilterRequest) {
    this.currentFilter.set(filter);
    this.currentPage.set(0); // Reset to first page on new filter
  }

  private loadUsers() {
    this.isLoading.set(true);

    const payload: UsersFilterPayload = {
      request: this.currentFilter(),
      page: this.currentPage(),
      size: this.PAGE_SIZE,
    };

    this.userManagementService.filterUsers(payload).subscribe({
      next: (data) => {
        this.paginatedData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        toast.error('Failed to load users', {
          description: 'Unable to fetch users data',
        });
        this.isLoading.set(false);
      },
    });
  }

  onUserSelected(userId: string) {
    this.dialog.open(UsersDetailModalComponent, {
      data: { userId },
    });
  }
}