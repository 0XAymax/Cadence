import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { GroupData } from '@app/core/services/groups-management.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-groups-list',
  imports: [
    ...HlmCardImports,
    ...HlmSkeletonImports,
    ...HlmBadgeImports,
    ...HlmButtonImports,
  ],
  template: `
    <div hlmCard class="border border-border rounded-lg w-full">
      <div hlmCardContent class="pt-6 pb-4 px-4">
        <!-- Header -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-foreground">Groups</h3>
          @if (groupsList()) {
            <p class="text-sm text-muted-foreground mt-1">
              Found {{ groupsList()!.length }} group(s)
            </p>
          }
        </div>

        <!-- Loading State -->
        @if (isLoading()) {
          <div class="space-y-3">
            <hlm-skeleton class="h-12 w-full rounded" />
            <hlm-skeleton class="h-10 w-full rounded" />
            <hlm-skeleton class="h-10 w-full rounded" />
          </div>
        } @else if (groupsList() && groupsList()!.length > 0) {
          <!-- Table -->
          <div class="overflow-x-auto border border-border rounded-md">
            <table class="w-full">
              <thead class="bg-muted border-b border-border">
                <tr>
                  <th class="px-4 py-3 text-left font-semibold text-foreground">Name</th>
                  <th class="px-4 py-3 text-center font-semibold text-foreground">Privacy Level</th>
                  <th class="px-4 py-3 text-left font-semibold text-foreground">ID</th>
                </tr>
              </thead>
              <tbody>
                @for (group of groupsList()!; track group.id) {
                  <tr
                    class="border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
                    (click)="groupSelected.emit(group.id)"
                  >
                    <td class="px-4 py-3 font-medium text-foreground">{{ group.name }}</td>
                    <td class="px-4 py-3 text-center">
                      <span
                        hlmBadge
                        variant="outline"
                        [class]="getPrivacyBadgeClass(group.privacyLevel)"
                      >
                        {{ group.privacyLevel }}
                      </span>
                    </td>
                    <td class="px-4 py-3 text-xs font-mono text-muted-foreground truncate">
                      {{ group.id }}
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        } @else {
          <div class="py-8 text-center text-muted-foreground">
            <p>No groups found</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class GroupsListComponent {
  groupsList = input<GroupData[] | null>(null);
  isLoading = input<boolean>(false);
  groupSelected = output<string>();

  getPrivacyBadgeClass(privacy: string): string {
    switch (privacy) {
      case 'PUBLIC':
        return 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20';
      case 'PRIVATE':
        return 'bg-purple-500/10 text-purple-700 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20';
    }
  }
}
