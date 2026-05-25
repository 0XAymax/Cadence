import { Component, inject, signal, ChangeDetectionStrategy, effect, computed } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { DashboardService, MFAActivityData } from '@app/core/services/dashboard.service';
import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-mfa-activities-table',
  imports: [
    ...HlmCardImports,
    ...HlmSkeletonImports,
    ...HlmBadgeImports,
  ],
  templateUrl: './mfa-activities-table.html',
})
export class MFAActivitiesTableComponent {
  private readonly dashboardService = inject(DashboardService);

  tableData = signal<MFAActivityData[]>([]);
  isLoading = signal<boolean>(false);

  constructor() {
    effect(() => this.loadTableData());
  }

  private loadTableData() {
    this.isLoading.set(true);
    this.dashboardService.getMFAActivities().subscribe({
      next: (data) => {
        this.tableData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        toast.error('Failed to load MFA activities', {
          description: 'Unable to fetch MFA activity logs',
        });
        this.isLoading.set(false);
      },
    });
  }

  formatTime(isoString: string): string {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return 'N/A';
    }
  }

  getStatusBadgeClass(isUsed: boolean): string {
    return isUsed
      ? 'bg-green-500/10 text-green-700 hover:bg-green-500/20'
      : 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20';
  }

  getStatusText(isUsed: boolean): string {
    return isUsed ? 'Used' : 'Unused';
  }
}
