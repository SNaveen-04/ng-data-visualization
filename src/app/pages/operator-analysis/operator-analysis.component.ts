import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../shared/product-sales/product-sales.component';
import { data } from '../data';

@Component({
  selector: 'app-operator-analysis',
  imports: [
    CustomerInsightsComponent,
    LineChartComponent,
    ProductSalesComponent,
  ],
  templateUrl: './operator-analysis.component.html',
  styleUrl: './operator-analysis.component.css',
})
export class OperatorAnalysisComponent {
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
