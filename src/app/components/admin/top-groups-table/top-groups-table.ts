import { Component, inject, signal, ChangeDetectionStrategy, effect } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DashboardService, TopGroupData } from '@app/core/services/dashboard.service';
import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-top-groups-table',
  imports: [
    ...HlmCardImports,
    ...HlmSkeletonImports,
    ...HlmBadgeImports,
  ],
  templateUrl: './top-groups-table.html',
})
export class TopGroupsTableComponent {
  private readonly dashboardService = inject(DashboardService);

  tableData = signal<TopGroupData[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => this.loadTableData());
  }

  private loadTableData() {
    this.isLoading.set(true);
    this.dashboardService.getTopGroups().subscribe({
      next: (data) => {
        this.tableData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        toast.error('Failed to load top groups', {
          description: 'Unable to fetch active groups data',
        });
        this.isLoading.set(false);
      },
    });
  }

  getPrivacyBadgeClass(privacy: string): string {
    return privacy === 'PUBLIC'
      ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20'
      : 'bg-blue-500/10 text-blue-700 hover:bg-blue-500/20';
  }
}
