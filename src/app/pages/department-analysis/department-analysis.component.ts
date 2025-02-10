import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from "../../shared/line-chart/line-chart.component";
import { DepartmentBarChartComponent } from '../../shared/d3-bar-chart/department-bar-chart/horizontal-bar-chart.component';

@Component({
  selector: 'app-department-analysis',
  imports: [CustomerInsightsComponent, LineChartComponent,DepartmentBarChartComponent],
  templateUrl: './department-analysis.component.html',
  styleUrl: './department-analysis.component.css',
})
export class DepartmentAnalysisComponent {

  data1: any[] = [
    {
      "name": "Apple",
      "value": 50000,
    },
    {
      "name": "Orange",
      "value": 40000,
    },
    {
      "name": "pine apple",
      "value": 30000,
    },
    {
      "name": "Mango",
      "value": 20000,
    },
    {
      "name": "grapes",
      "value": 10000,
    }
  ];
  
}
