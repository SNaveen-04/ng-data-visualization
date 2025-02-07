import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from "../../shared/line-chart/line-chart.component";

@Component({
  selector: 'app-department-analysis',
  imports: [CustomerInsightsComponent, LineChartComponent],
  templateUrl: './department-analysis.component.html',
  styleUrl: './department-analysis.component.css',
})
export class DepartmentAnalysisComponent {}
