import { Component, ChangeDetectionStrategy, inject, signal, effect, computed, DestroyRef } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { NgxEchartsDirective } from 'ngx-echarts';
import { UserManagementService, UserDetailsResponse } from '@app/core/services/user-management.service';
import { toast } from 'ngx-sonner';
import * as echarts from 'echarts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface DialogData {
    userId: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-users-detail-modal',
    standalone: true,
    imports: [
        ...HlmButtonImports,
        ...HlmBadgeImports,
        ...HlmSkeletonImports,
        NgxEchartsDirective,
    ],
    template: `
    <div class="rounded-lg border border-border bg-background shadow-lg min-w-[900px] max-w-4xl">
      @if (isLoading()) {
        <div class="space-y-4 p-8">
          <hlm-skeleton class="h-8 w-48 rounded" />
          <hlm-skeleton class="h-4 w-32 rounded" />
          <div class="space-y-2">
            <hlm-skeleton class="h-4 w-full rounded" />
            <hlm-skeleton class="h-4 w-full rounded" />
            <hlm-skeleton class="h-4 w-3/4 rounded" />
          </div>
        </div>
      } @else if (userDetails()) {
        <!-- Header Section -->
        <div class="border-b border-border bg-gradient-to-r from-muted to-background px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-3xl font-bold text-foreground">
                {{ userDetails()!.firstName }} {{ userDetails()!.lastName }}
              </h2>
              <p class="text-sm text-muted-foreground mt-2">{{ userDetails()!.email }}</p>
            </div>
            <div class="text-right">
              <span
                hlmBadge
                variant="outline"
                [class]="getStatusBadgeClass(userDetails()!.status)"
                class="text-lg px-4 py-2"
              >
                {{ userDetails()!.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Body Content -->
        <div class="px-8 py-6 space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto">
          <!-- User Information Block (Inline) -->
          <div class="border border-border rounded-lg bg-muted/30 p-6">
            <div class="flex flex-wrap gap-8 items-start">
              <div class="flex-1 min-w-[220px]">
                <p class="text-xs text-muted-foreground uppercase font-semibold mb-2">ID</p>
                <p class="text-xs text-foreground font-medium truncate font-mono">{{ userDetails()!.id }}</p>
              </div>
              <div class="flex-1 min-w-[200px]">
                <p class="text-xs text-muted-foreground uppercase font-semibold mb-2">Email</p>
                <p class="text-sm text-foreground font-medium truncate">{{ userDetails()!.email }}</p>
              </div>
              <div class="flex-1 min-w-[150px]">
                <p class="text-xs text-muted-foreground uppercase font-semibold mb-2">Phone</p>
                <p class="text-sm text-foreground font-medium truncate">{{ userDetails()!.phone }}</p>
              </div>
              <div class="flex-1 min-w-[120px]">
                <p class="text-xs text-muted-foreground uppercase font-semibold mb-2">Gender</p>
                <p class="text-sm text-foreground font-medium">{{ getGenderDisplay(userDetails()!.gender) }}</p>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="space-y-6">
            <!-- Weekly Sessions Pie Chart (Always Visible) -->
            <div class="border border-border rounded-lg bg-muted/30 p-6">
              <h3 class="text-base font-semibold mb-4 text-foreground">Session Distribution</h3>
              <div
                echarts
                [options]="weeklySessionPieChartOptions()"
                [style.height.px]="300"
                class="w-full"
              ></div>
            </div>
            <!-- Groups Bar Chart -->
            @if (userDetails()!.groupsForUser.length > 0) {
              <div class="border border-border rounded-lg bg-muted/30 p-6">
                <h3 class="text-base font-semibold mb-4 text-foreground">Groups Activity</h3>
                <div
                  echarts
                  [options]="groupsBarChartOptions()"
                  [style.height.px]="300"
                  class="w-full"
                ></div>
              </div>
            } @else {
              <div class="border border-border rounded-lg bg-muted/30 p-8 text-center">
                <p class="text-muted-foreground">User is not part of any groups</p>
              </div>
            }
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-border px-8 py-4 flex justify-between gap-2 bg-muted/20">
          <div>
            @if (userDetails()!.status === 'ACTIVE') {
              <button hlmBtn variant="destructive" (click)="onBan()" [disabled]="isActionLoading()">
                {{ isActionLoading() ? 'Banning...' : 'Ban User' }}
              </button>
            } @else if (userDetails()!.status === 'BANNED' || userDetails()!.status === 'INACTIVE') {
              <button hlmBtn variant="outline" (click)="onUnban()" [disabled]="isActionLoading()">
                {{ isActionLoading() ? 'Unbanning...' : 'Unban User' }}
              </button>
            }
          </div>
          <div class="flex gap-2">
            <button hlmBtn variant="outline" (click)="onReload()" [disabled]="isLoading()">
              {{ isLoading() ? 'Reloading...' : 'Reload' }}
            </button>
            <button hlmBtn variant="outline" (click)="onClose()">Close</button>
          </div>
        </div>
      }
    </div>
  `,
})
export class UsersDetailModalComponent {
    private readonly userManagementService = inject(UserManagementService);
    private readonly dialogRef = inject(DialogRef<void>);
    private readonly dialogData = inject<DialogData>(DIALOG_DATA);
    private readonly destroyRef = inject(DestroyRef);

    userDetails = signal<UserDetailsResponse | null>(null);
    isLoading = signal<boolean>(true);
    isActionLoading = signal<boolean>(false);

    groupsBarChartOptions = computed(() => {
        const details = this.userDetails();
        if (!details || details.groupsForUser.length === 0) {
            return {};
        }

        const groupNames = details.groupsForUser.map((g) => g.groupName);
        const activityRecords = details.groupsForUser.map((g) => g.activityRecord);

        return {
            color: ['#10b981'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: '#e5e7eb',
                textStyle: { color: '#ffffff' },
            },
            grid: {
                left: '12%',
                right: '5%',
                top: '10%',
                bottom: '12%',
                containLabel: true,
            },
            xAxis: {
                type: 'value',
                axisLine: { lineStyle: { color: '#d1d5db' } },
                splitLine: { lineStyle: { color: '#f3f4f6' } },
                axisLabel: { color: '#6b7280', fontSize: 11 },
            },
            yAxis: {
                type: 'category',
                data: groupNames,
                axisLine: { lineStyle: { color: '#d1d5db' } },
                axisLabel: { color: '#6b7280', fontSize: 11 },
            },
            series: [
                {
                    type: 'bar',
                    data: activityRecords,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            { offset: 0, color: '#10b981' },
                            { offset: 1, color: '#059669' },
                        ]),
                    },
                    label: {
                        show: true,
                        position: 'right',
                        color: '#374151',
                        fontSize: 12,
                        fontWeight: 'bold',
                    },
                },
            ],
        };
    });

    weeklySessionPieChartOptions = computed(() => {
        const details = this.userDetails();
        if (!details) {
            return {};
        }

        const { completedWeeklySession, activeWeeklySession, incompletedWeeklySession, pendingWeeklySession } =
            details.chartWeeklySessionPlanForUserRes;

        const data = [
            { value: completedWeeklySession, name: 'Completed', itemStyle: { color: '#10b981' } },
            { value: activeWeeklySession, name: 'Active', itemStyle: { color: '#3b82f6' } },
            { value: incompletedWeeklySession, name: 'Incomplete', itemStyle: { color: '#ef4444' } },
            { value: pendingWeeklySession, name: 'Pending', itemStyle: { color: '#f59e0b' } },
        ];

        return {
            tooltip: {
                trigger: 'item',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderColor: '#e5e7eb',
                textStyle: { color: '#ffffff' },
                formatter: '{b}: {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                right: '3%',
                top: 'center',
                textStyle: { color: '#6b7280', fontSize: 12 },
            },
            series: [
                {
                    type: 'pie',
                    radius: ['30%', '70%'],
                    center: ['35%', '50%'],
                    data: data,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    label: {
                        show: true,
                        formatter: '{b}',
                        position: 'outside',
                        color: '#374151',
                        fontSize: 11,
                    },
                },
            ],
        };
    });

    constructor() {
        effect(() => this.loadUserDetails());
    }

    private loadUserDetails() {
        this.isLoading.set(true);
        this.userManagementService.getUserDetails(this.dialogData.userId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: (data) => {
                    this.userDetails.set(data);
                    this.isLoading.set(false);
                },
                error: () => {
                    toast.error('Failed to load user details');
                    this.isLoading.set(false);
                },
            });
    }

    onReload() {
        this.loadUserDetails();
    }

    onClose() {
        this.dialogRef.close();
    }

    onBan() {
        if (!this.userDetails()) return;
        this.isActionLoading.set(true);
        this.userManagementService
            .banUser(this.userDetails()!.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    toast.success('User banned successfully');
                    this.loadUserDetails();
                    this.isActionLoading.set(false);
                },
                error: () => {
                    toast.error('Failed to ban user');
                    this.isActionLoading.set(false);
                },
            });
    }

    onUnban() {
        if (!this.userDetails()) return;
        this.isActionLoading.set(true);
        this.userManagementService
            .unbanUser(this.userDetails()!.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
                next: () => {
                    toast.success('User unbanned successfully');
                    this.loadUserDetails();
                    this.isActionLoading.set(false);
                },
                error: () => {
                    toast.error('Failed to unban user');
                    this.isActionLoading.set(false);
                },
            });
    }

    getStatusBadgeClass(status: string): string {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/30';
            case 'INACTIVE':
                return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20 border-gray-500/30';
            case 'SUSPENDED':
                return 'bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20 border-yellow-500/30';
            case 'BANNED':
                return 'bg-red-500/10 text-red-700 hover:bg-red-500/20 border-red-500/30';
            default:
                return 'bg-gray-500/10 text-gray-700 hover:bg-gray-500/20 border-gray-500/30';
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
