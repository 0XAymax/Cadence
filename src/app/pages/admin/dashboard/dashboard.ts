import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DashboardCardsComponent } from '@app/components/admin/dashboard-cards/dashboard-cards';
import { StackedAreaChartComponent } from '@app/components/admin/stacked-area-chart/stacked-area-chart';
import { DoughnutChartComponent } from '@app/components/admin/doughnut-chart/doughnut-chart';
import { HeatmapChartComponent } from '@app/components/admin/heatmap-chart/heatmap-chart';
import { TopGroupsTableComponent } from '@app/components/admin/top-groups-table/top-groups-table';
import { MFAActivitiesTableComponent } from '@app/components/admin/mfa-activities-table/mfa-activities-table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-admin-dashboard',
  imports: [
    DashboardCardsComponent,
    StackedAreaChartComponent,
    DoughnutChartComponent,
    HeatmapChartComponent,
    TopGroupsTableComponent,
    MFAActivitiesTableComponent,
  ],
  templateUrl: './dashboard.html',
})
export class AdminDashboard {}