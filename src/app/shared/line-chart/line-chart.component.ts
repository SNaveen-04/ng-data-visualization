import { Component, ElementRef, ViewChild } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { curveCatmullRom } from 'd3-shape';
import { data } from './data';
@Component({
  selector: 'app-line-chart',
  imports: [NgxChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent {
  curve = curveCatmullRom;
  data!: [];

  @ViewChild('customMarkersTemplate') customMarkersTemplate!: ElementRef;

  constructor() {
    Object.assign(this, { data });
  }

  customScheme: Color = {
    domain: ['#50C878', '#F4C542'],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal,
  };

  xAxisFormat(d: string) {
    return new Date(d).getUTCFullYear();
  }

  yAxisFormat(d: number) {
    return d / 1000 + 'k';
  }
}
