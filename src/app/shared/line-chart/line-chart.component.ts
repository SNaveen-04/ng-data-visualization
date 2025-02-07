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

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    this.view = [this.getScreenWidth > 1440 ? 1100 : 720, 400];
  }

  data!: [
    {
      name: 'Kazakhstan';
      series: [
        {
          value: 2394;
          name: '2016-09-20T11:02:58.070Z';
        },
        {
          value: 2714;
          name: '2016-09-17T17:26:35.797Z';
        },
        {
          value: 2697;
          name: '2016-09-16T13:26:47.646Z';
        },
        {
          value: 5269;
          name: '2016-09-20T20:17:01.389Z';
        },
        {
          value: 17213;
          name: '2016-09-23T06:15:35.222Z';
        }
      ];
    },
    {
      name: 'Bangladesh';
      series: [
        {
          value: 1;
          name: '2016-09-20T11:02:58.070Z';
        },
        {
          value: 2939;
          name: '2016-09-17T17:26:35.797Z';
        },
        {
          value: 4306;
          name: '2016-09-16T13:26:47.646Z';
        },
        {
          value: 2230;
          name: '2016-09-20T20:17:01.389Z';
        },
        {
          value: 6731;
          name: '2016-09-23T06:15:35.222Z';
        }
      ];
    },
    {
      name: 'Georgia';
      series: [
        {
          value: 2399;
          name: '2016-09-20T11:02:58.070Z';
        },
        {
          value: 3367;
          name: '2016-09-17T17:26:35.797Z';
        },
        {
          value: 3676;
          name: '2016-09-16T13:26:47.646Z';
        },
        {
          value: 6826;
          name: '2016-09-20T20:17:01.389Z';
        },
        {
          value: 5055;
          name: '2016-09-23T06:15:35.222Z';
        }
      ];
    },
    {
      name: 'Botswana';
      series: [
        {
          value: 2965;
          name: '2016-09-20T11:02:58.070Z';
        },
        {
          value: 4340;
          name: '2016-09-17T17:26:35.797Z';
        },
        {
          value: 4696;
          name: '2016-09-16T13:26:47.646Z';
        },
        {
          value: 2353;
          name: '2016-09-20T20:17:01.389Z';
        },
        {
          value: 3057;
          name: '2016-09-23T06:15:35.222Z';
        }
      ];
    },
    {
      name: 'Comoros';
      series: [
        {
          value: 5374;
          name: '2016-09-20T11:02:58.070Z';
        },
        {
          value: 2123;
          name: '2016-09-17T17:26:35.797Z';
        },
        {
          value: 6490;
          name: '2016-09-16T13:26:47.646Z';
        },
        {
          value: 2772;
          name: '2016-09-20T20:17:01.389Z';
        },
        {
          value: 6292;
          name: '2016-09-23T06:15:35.222Z';
        }
      ];
    }
  ];

  curve = curveCatmullRom;

  constructor() {
    Object.assign(this, { data });
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
    return d / 1000 + 'k';
  }

  onResize(event: any) {
    // this.view = [event.target.innerWidth - 400, 500];
  }
}
