import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../../shared/horizontal-bar-chart/horizontal-bar-chart.component';
import { LineChartdata } from '../../../../data';
import { HttpService } from '../../../service/http-service.service';
import { MultiSelectDropDownComponent } from '../../../shared/multi-select-drop-down/multi-select-drop-down.component';
import { ChipsComponent } from '../../../shared/chips/chips.component';
import { CrossSellingDepartments, customerData } from '../../../../data';
import { CrossSellingBarChartComponent } from '../../../shared/cross-selling-bar-chart/cross-selling-bar-chart.component';
@Component({
  selector: 'app-store-analysis',
  imports: [
    LineChartComponent,
    CustomerInsightsComponent,
    HorizontalBarChartComponent,
    MultiSelectDropDownComponent,
    ChipsComponent,
    CrossSellingBarChartComponent,
  ],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {
  private httpService = inject(HttpService);
  public crossData = CrossSellingDepartments;
  customerData = customerData;

  LineChartdata!: LineChartData;
  listElements: {
    id: string;
    name: string;
    selected: boolean;
  }[] = [];
  get selectedDepartments() {
    return this.listElements
      .filter((d) => d.selected)
      .map((d) => {
        return {
          id: d.id,
          name: d.name,
        };
      });
  }
  selected = '';
  select(value: string) {
    console.log(value);
    // this.selected = value;
  }
  constructor() {
    Object.assign(this, { LineChartdata });
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

    // this.httpService.getDepartmentTrends(1).subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    //   error: (error) => console.log(error),
    // });
  }
}
