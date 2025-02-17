import { Component, DestroyRef, inject, input, ViewChild } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom, curveBasis } from 'd3-shape';
import { CustomLinerChartService } from './CustomLineChartService';
import { timeFrame } from '../../type';
import { HttpService } from '../../service/http-service.service';
@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  private customLinerChartService = inject(CustomLinerChartService);
  timeFrame = '';
  chartData = input.required<LineChartData>();
  yAxisLabel = input.required<'sales' | 'quantity'>();
  xAxisLabel = input.required<timeFrame>();
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);
  @ViewChild('chart') chart: any;
  view: [number, number] = [760, 400];
  colors: string[] = [];
  curve = curveCatmullRom;
  max = 0;
  min = 0;
  get Trends() {
    let trends = this.yAxisLabel();
    trends = trends.at(0)?.toUpperCase() + trends.substring(1);
    return trends + ' trends';
  }

  ngOnInit() {
    const timeFrameSubscriber = this.httpService.timeFrame$.subscribe({
      next: (data) => {
        if (this.timeFrame !== data) {
          this.timeFrame = data;
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      timeFrameSubscriber.unsubscribe();
    });
    this.colors = [
      '#50c878',
      '#e92929',
      '#2d91e4',
      '#5e2de4',
      '#e929df',
      '#e99d0f',
      '#F4C542',
      '#000000',
    ];
    this.customScheme.domain = this.colors;
  }

  ngOnChanges() {
    this.max = 0;
    this.min = 1000;
    this.timeFrame = this.httpService.getTimeFrame();
    this.chartData().map((d) =>
      d.series.map((s) => {
        if (Number(s.value) > this.max) {
          this.max = Number(s.value);
        }
        if (Number(s.value) < this.min) {
          this.min = Number(s.value);
        }
      })
    );
    if (this.max < 100) {
      this.max = 200;
    }
    if (this.min < 200) {
      this.min = 0;
    }
  }

  ngAfterViewChecked() {
    this.customLinerChartService.showDots(this.chart);
  }

  customScheme: Color = {
    domain: [],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  getXFormatter() {
    if (this.xAxisLabel() === 'week') {
      return this.weekFormatter;
    } else {
      if (this.xAxisLabel() === 'month') {
        return this.monthFormatter;
      } else {
        if (this.xAxisLabel() === 'year') {
          return this.YearFormatter;
        }
        return this.dayFormatter;
      }
    }
  }

  getYFormatter() {
    if (this.yAxisLabel() === 'sales') {
      return this.salesFormat;
    }
    return this.normalFormat;
  }

  salesFormat(d: number) {
    return '$' + d;
  }

  normalFormat(d: number) {
    return d;
  }

  dayFormatter(date: string) {
    const hour = new Date(date).getHours();
    if (hour === 0) return 24;
    return hour;
  }

  weekFormatter(date: string) {
    const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return day[new Date(date).getDay()];
  }

  monthFormatter(date: string) {
    return new Date(date).getDate();
  }
  YearFormatter(date: string) {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    return months[new Date(date).getMonth()];
  }

  yAxisFormat(d: number) {
    return '$' + d;
  }
}

export type LineChartData = {
  name: string;
  series: {
    name: string;
    value: string;
  }[];
}[];
