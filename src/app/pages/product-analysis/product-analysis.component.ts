import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { CrossSellingProductsComponent } from '../../shared/cross-selling-products/cross-selling-products.component';
import { data } from '../data';

@Component({
  selector: 'app-product-analysis',
  imports: [CustomerInsightsComponent, CrossSellingProductsComponent],
  templateUrl: './product-analysis.component.html',
  styleUrl: './product-analysis.component.css',
})
export class ProductAnalysisComponent {
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
