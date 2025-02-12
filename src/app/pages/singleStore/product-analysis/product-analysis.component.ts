import { Component, inject, signal } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import { CrossSellingProductsComponent } from '../../../shared/cross-selling-products/cross-selling-products.component';
import { LineChartdata } from '../../../../data';
import { customerData } from '../../../../data';
import { CrossSellingProducts } from '../../../../data';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { HttpService } from '../../../service/http-service.service';
import { crossSellingProductsData, listData, timeFrame } from '../../../type';

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

  listElements: listData = [];
  selected = {
    id: '',
    name: '',
  };
  isLoaded = false;
  crossSellingProducts = signal<crossSellingProductsData>([]);
  customerData = customerData;
  LineChartdata!: LineChartData;
  timeFrame: timeFrame = 'week';
  constructor() {
    Object.assign(this, { LineChartdata });
  }

  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.httpService.getProductList().subscribe({
      next: (data) => {
        this.listElements = data;
        this.selected = this.listElements[0];
        this.getProductTrends();
        this.getCrossSellingProducts();
      },
      error: (e) => console.log(e),
    });
  }

  getProductTrends() {
    this.httpService
      .getProductTrends(this.selected.id, this.timeFrame)
      .subscribe({
        next: (data) => {
          this.LineChartdata = data;
          this.isLoaded = true;
        },
        error: (error) => console.log(error),
      });
  }

  getCrossSellingProducts() {
    this.httpService
      .getCrossSellingProducts([this.selected.id], this.timeFrame)
      .subscribe({
        next: (d) => {
          this.crossSellingProducts.set(d[0].data);
        },
        error: (e) => console.log(e),
      });
  }

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getProductTrends();
      this.getCrossSellingProducts();
    }
  }
}
