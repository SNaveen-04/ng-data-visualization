import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from '../../../shared/line-chart/line-chart.component';
import { data } from '../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { DepartmentBarChartComponent } from '../../../shared/d3-bar-chart/department-bar-chart/department-bar-chart-component';
@Component({
  selector: 'app-department-analysis',
  imports: [
    CustomerInsightsComponent,
    LineChartComponent,
    DropDownComponent,
    DepartmentBarChartComponent,
  ],
  templateUrl: './department-analysis.component.html',
  styleUrl: './department-analysis.component.css',
})
export class DepartmentAnalysisComponent {
  data!: {
    name: string;
    color: string;
    series: {
      name: string;
      value: string;
    }[];
  }[];

  constructor() {
    Object.assign(this, { data });
  }
}
