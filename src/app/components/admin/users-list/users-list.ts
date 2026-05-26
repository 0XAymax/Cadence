import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { UsersPaginatedResponse, UserData } from '@app/core/services/user-management.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-users-list',
  imports: [
    ...HlmCardImports,
    ...HlmSkeletonImports,
    ...HlmBadgeImports,
    ...HlmButtonImports,
  ],
  templateUrl: './users-list.html',
})
export class UsersListComponent {
  paginatedData = input<UsersPaginatedResponse | null>(null);
  isLoading = input<boolean>(false);
  userSelected = output<string>();

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/10 text-green-700 hover:bg-green-500/20';
      case 'INACTIVE':
        return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
      case 'SUSPENDED':
        return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
      case 'BANNED':
        return 'bg-red-500/10 text-red-700 hover:bg-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
    }
  }

  getGenderDisplay(gender: string): string {
    const genderMap: Record<string, string> = {
      MALE: 'Male',
      FEMALE: 'Female',
      OTHER: 'Other',
    };
    return genderMap[gender] || gender;
  }
}
