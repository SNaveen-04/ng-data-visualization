import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../../shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component';
import { data } from '../../data';
import { HttpServiceService } from '../../../service/http-service.service';
import { CrossSellingBarChartComponent } from '../../../shared/d3-bar-chart/cross-selling-bar-chart/horizontal-bar-chart.component';
import { MultiSelectDropDownComponent } from '../../../shared/multi-select-drop-down/multi-select-drop-down.component';
@Component({
  selector: 'app-store-analysis',
  imports: [
    LineChartComponent,
    CustomerInsightsComponent,
    HorizontalBarChartComponent,
    CrossSellingBarChartComponent,
    MultiSelectDropDownComponent,
  ],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {
  private httpService = inject(HttpServiceService);
  data!: LineChartData;
  listElements = [
    {
      value: '101',
      selected: false,
    },
    {
      value: '102',
      selected: false,
    },
    {
      value: '103',
      selected: false,
    },
    {
      value: '104',
      selected: false,
    },
  ];
  selected = this.listElements[0].value;
  select(value: string) {
    console.log(value);
    // this.selected = value;
  }
  constructor() {
    Object.assign(this, { data });
  }

  ngOnInit() {
    // this.httpService.getLineChartData().subscribe({
    //   next: (data) => {
    //     this.data = data as LineChartData;
    //     console.log(this.data);
    //   },
    //   error: (error) => console.log(error),
    // });
  }
}
