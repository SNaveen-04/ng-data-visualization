import { Component, inject, ViewChild } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom } from 'd3-shape';
import { data } from './data';
import { CustomLinerChartService } from './CustomLineChartService';
@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  private customLinerChartService = inject(CustomLinerChartService);
  @ViewChild('chart') chart: any;
  public getScreenWidth: any;
  view: [number, number] = [760, 400];
  colors: string[] = [];
  data = [
    {
      name: 'Kazakhstan',
      color: '#000',
      series: [
        {
          value: 2394,
          name: '2016-09-20T11:02:58.070Z',
        },
        {
          value: 2714,
          name: '2016-09-17T17:26:35.797Z',
        },
        {
          value: 2697,
          name: '2016-09-16T13:26:47.646Z',
        },
        {
          value: 5269,
          name: '2016-09-20T20:17:01.389Z',
        },
        {
          value: 17213,
          name: '2016-09-23T06:15:35.222Z',
        },
      ],
    },
  ];

  curve = curveCatmullRom;

  constructor() {
    Object.assign(this, { data });
    this.colors = data.map((d) => d.color);
    this.customScheme.domain = this.colors;
  }

  ngAfterViewInit() {
    this.customLinerChartService.showDots(this.chart);
  }

  customScheme: Color = {
    domain: ['#50C878', '#F4C542'],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  xAxisFormat(d: string) {
    return new Date(d).getDay();
  }

  yAxisFormat(d: number) {
    return '$' + d;
  }
}
