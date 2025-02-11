import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../../shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component';
import { data } from '../../data';
import { HttpService } from '../../../service/http-service.service';
import { CrossSellingBarChartComponent } from '../../../shared/d3-bar-chart/cross-selling-bar-chart/horizontal-bar-chart.component';
import { MultiSelectDropDownComponent } from '../../../shared/multi-select-drop-down/multi-select-drop-down.component';
import { ChipsComponent } from "../../../shared/chips/chips.component";
@Component({
  selector: 'app-store-analysis',
  imports: [
    LineChartComponent,
    CustomerInsightsComponent,
    HorizontalBarChartComponent,
    CrossSellingBarChartComponent,
    MultiSelectDropDownComponent,
    ChipsComponent
],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {
  private httpService = inject(HttpService);
  data!: LineChartData;
  listElements: {
    id: string;
    name: string;
    selected: boolean;
  }[] = [];
  selected = '';
  select(value: string) {
    console.log(value);
    // this.selected = value;
  }
  constructor() {
    Object.assign(this, { data });
  }

  ngOnInit() {
    this.httpService.getDepartmentsList().subscribe({
      next: (data) => {
        this.listElements = data.map((d) => {
          return {
            ...d,
            selected: false,
          };
        });
        this.selected = this.listElements[0].name;
      },
      error: (e) => console.log(e),
    });
    // this.httpService.getLineChartData().subscribe({
    //   next: (data) => {
    //     this.data = data as LineChartData;
    //     console.log(this.data);
    //   },
    //   error: (error) => console.log(error),
    // });
  }
}
