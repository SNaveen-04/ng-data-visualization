import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../../shared/product-sales/product-sales.component';
import { data } from '../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-operator-analysis',
  imports: [
    CustomerInsightsComponent,
    LineChartComponent,
    DropDownComponent,
    ProductSalesComponent,
  ],
  templateUrl: './operator-analysis.component.html',
  styleUrl: './operator-analysis.component.css',
})
export class OperatorAnalysisComponent {
  data!: LineChartData;
  listElements = ['100', '101', '102', '103'];
  constructor() {
    Object.assign(this, { data });
  }
  selected = this.listElements[0];
  select(value: string) {
    console.log(value);
    this.selected = value;
  }
}
