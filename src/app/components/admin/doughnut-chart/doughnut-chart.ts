import { Component, inject, signal, ChangeDetectionStrategy, effect, computed } from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { NgxEchartsDirective } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { DashboardService, DoughnutChartData } from '@app/core/services/dashboard.service';
import { toast } from 'ngx-sonner';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-doughnut-chart',
  imports: [
    ...HlmCardImports,
    ...HlmSkeletonImports,
    NgxEchartsDirective,
  ],
  templateUrl: './doughnut-chart.html',
})
export class DoughnutChartComponent {
  private readonly dashboardService = inject(DashboardService);

  chartData = signal<DoughnutChartData | null>(null);
  isLoading = signal<boolean>(false);

  chartOptions = computed(() => {
    const data = this.chartData();
    if (!data) return null;
    return this.buildChartOptions(data);
  });

  constructor() {
    effect(() => this.loadChartData());
  }

  private loadChartData() {
    this.isLoading.set(true);
    this.dashboardService.getDoughnutChartData().subscribe({
      next: (data) => {
        this.chartData.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        toast.error('Failed to load doughnut chart', {
          description: 'Unable to fetch subject priority data',
        });
        this.isLoading.set(false);
      },
    });
  }

  private buildChartOptions(data: DoughnutChartData): EChartsOption {
    return {
      color: ['#ef4444', '#f59e0b', '#10b981'], // Red, Amber, Green
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        data: ['High Priority (Stressed)', 'Medium Priority (Balanced)', 'Low Priority (Chill)'],
      },
      series: [
        {
          name: 'Subject Priorities',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          data: [
            {
              value: data.highPSubject,
              name: 'High Priority (Stressed)',
            },
            {
              value: data.mediumPSubject,
              name: 'Medium Priority (Balanced)',
            },
            {
              value: data.lowPSubject,
              name: 'Low Priority (Chill)',
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            length: 20,
          },
        },
      ],
    };
  }
}
