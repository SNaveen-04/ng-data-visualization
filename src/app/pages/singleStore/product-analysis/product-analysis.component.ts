import { Component, DestroyRef, inject, signal } from '@angular/core';
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
import {
  crossSellingProductsData,
  customerInsightsData,
  listData,
  timeFrame,
} from '../../../type';

@Component({
  selector: 'app-product-analysis',
  imports: [
    CrossSellingProductsComponent,
    DropDownComponent,
    LineChartComponent,
    CustomerInsightsComponent,
  ],
  templateUrl: './product-analysis.component.html',
  styleUrl: './product-analysis.component.css',
})
export class ProductAnalysisComponent {
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);
  yAxisLabel: 'sales' | 'quantity' = 'sales';
  filter = '';
  customerData = signal<customerInsightsData>([]);
  listElements: listData = [];
  selected = {
    id: '',
    name: '',
  };
  isLoaded = false;
  crossSellingProducts = signal<crossSellingProductsData>([]);
  LineChartdata!: LineChartData;
  timeFrame: timeFrame = 'week';
  constructor() {
    Object.assign(this, { LineChartdata });
  }

  ngOnInit() {
    this.filter = this.httpService.getTargetValue();
    const targetSubscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        this.yAxisLabel = d;
        this.getProductAnalysis();
      },
    });
    const storeSubscriber = this.httpService.storeId$.subscribe({
      next: () => {
        this.getProductList();
        this.getProductAnalysis();
      },
    });
    const timeFrameSubscriber = this.httpService.timeFrame$.subscribe({
      next: (data) => {
        if (this.timeFrame !== data) {
          this.timeFrame = data;
          this.getProductAnalysis();
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      targetSubscriber.unsubscribe();
      storeSubscriber.unsubscribe();
      timeFrameSubscriber.unsubscribe();
    });
  }

  getProductAnalysis() {
    if (this.selected.id !== '') {
      this.getProductTrends();
      this.getCrossSellingProducts();
      this.getProductCustomerInsights();
    }
  }

  getProductList() {
    this.httpService.getProductList().subscribe({
      next: (data) => {
        this.listElements = data;
        this.selected = this.listElements[0];
        this.getProductAnalysis();
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
          const temp = d[0].data;
          if (temp.length < 3) {
            let i = 1;
            while (temp.length < 3) {
              temp.push({
                name: '-',
                department: '-',
                value: 0,
              });
              i++;
            }
            this.crossSellingProducts.set(temp);
          }
          this.crossSellingProducts.set(d[0].data);
        },
        error: (e) => console.log(e),
      });
  }

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getProductAnalysis();
    }
  }

  getProductCustomerInsights() {
    this.httpService
      .getDepartmentCustomerInsights(this.selected.id, this.timeFrame)
      .subscribe({
        next: (data) => {
          console.log('filter : ', this.filter);
          console.log('CI : ', data);
          this.customerData.set([]);
          data[0].forEach((d, i) => {
            const temp: {
              name: string;
              value: number;
            } = {
              name: '',
              value: 0,
            };
            temp.name = d.name;
            if (this.filter === 'sales') {
              temp.value = Math.round(d.value[1]);
            } else {
              temp.value = Math.round(d.value[0]);
            }
            const tempData = this.customerData();
            tempData.push(temp);
            this.customerData.set(tempData);
          });
        },
        error: (e) => console.log(e),
      });
  }
}
