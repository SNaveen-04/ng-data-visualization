import { Component, inject, input, ViewChild } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom } from 'd3-shape';
import { CustomLinerChartService } from './CustomLineChartService';
@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  private customLinerChartService = inject(CustomLinerChartService);
  format = input<'Month' | 'Year'>();
  chartData = input.required<LineChartData>();

  get data() {
    return this.chartData();
  }
  @ViewChild('chart') chart: any;
  view: [number, number] = [760, 400];
  colors: string[] = [];

  curve = curveCatmullRom;

  ngOnInit() {
    this.colors = ['red', 'green', 'yellow'];
    this.customScheme.domain = this.colors;
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

  xAxisFormat(d: string) {
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
    return months[new Date(d).getMonth()];
  }

  yAxisFormat(d: number) {
    return '$' + d;
  }
}

export type LineChartData = {
  name: string;
  color: string;
  series: {
    name: string;
    value: string;
  }[];
}[];
