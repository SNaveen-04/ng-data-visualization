import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import { CrossSellingProductsComponent } from '../../../shared/cross-selling-products/cross-selling-products.component';
import { data } from '../../data';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';

@Component({
  selector: 'app-product-analysis',
  imports: [
    CustomerInsightsComponent,
    CrossSellingProductsComponent,
    DropDownComponent,
    LineChartComponent,
  ],
  templateUrl: './product-analysis.component.html',
  styleUrl: './product-analysis.component.css',
})
export class ProductAnalysisComponent {
  data!: LineChartData;
  listElements = ['Apple', 'Mango', 'Orange', 'Cucumber'];
  constructor() {
    Object.assign(this, { data });
  }
  selected = this.listElements[0];
  select(value: string) {
    console.log(value);
    this.selected = value;
  }
}
