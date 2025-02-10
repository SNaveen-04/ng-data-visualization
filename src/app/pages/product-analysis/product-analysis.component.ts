import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { CrossSellingProductsComponent } from '../../shared/cross-selling-products/cross-selling-products.component';

@Component({
  selector: 'app-product-analysis',
  imports: [CustomerInsightsComponent, CrossSellingProductsComponent],
  templateUrl: './product-analysis.component.html',
  styleUrl: './product-analysis.component.css',
})
export class ProductAnalysisComponent {}
