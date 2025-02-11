import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import { CrossSellingProductsComponent } from '../../../shared/cross-selling-products/cross-selling-products.component';
import { data } from '../../data';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { HttpService } from '../../../service/http-service.service';
import { listData } from '../../../type';

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
  private httpService = inject(HttpService);
  data!: LineChartData;
  listElements: listData = [];
  selected = '';
  constructor() {
    Object.assign(this, { data });
  }
  ngOnInit() {
    this.httpService.getProductList().subscribe({
      next: (data) => {
        this.listElements = data;
        this.selected = this.listElements[0].name;
      },
      error: (e) => console.log(e),
    });
  }
  select(value: string) {
    this.selected = value;
  }
}
