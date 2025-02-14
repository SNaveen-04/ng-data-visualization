import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CrossSellingProductsComponent } from '../../shared/cross-selling-products/cross-selling-products.component';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../shared/line-chart/line-chart.component';
import { HttpService } from '../../service/http-service.service';
import {
  crossSellingProductsData,
  customerInsightsData,
  listData,
  timeFrame,
} from '../../type';

@Component({
  selector: 'app-locality-analysis',
  imports: [
    CrossSellingProductsComponent,
    LineChartComponent,
    CustomerInsightsComponent,
  ],
  templateUrl: './locality-analysis.component.html',
  styleUrl: './locality-analysis.component.css',
})
export class LocalityAnalysisComponent {
  private readonly httpService = inject(HttpService);
  private readonly destroyRef = inject(DestroyRef);
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
  timeFrame: timeFrame = 'month';

  ngOnInit() {
    this.filter = this.httpService.getTargetValue();
    const storeSubscriber = this.httpService.storeId$.subscribe({
      next: () => {
        this.getProductList();
        this.getProductAnalysis();
      },
    });
    const targetSubscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        this.filter = d;
        this.yAxisLabel = d;
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
      this.getDepartmentPerformance();
      this.getMultiStoreCustomerInsights();
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
    this.httpService.getProductTrends(this.selected.id).subscribe({
      next: (data) => {
        this.LineChartdata = data;
        this.isLoaded = true;
      },
      error: (error) => console.log(error),
    });
  }

  getDepartmentPerformance() {
    this.httpService.getDepartmentPerformance().subscribe({
      next: (d) => {
        let array: any[] = [];
        let temp = d[0]['data'].slice(0, 5);
        temp.forEach((data: any) => {
          let tempFormat = {
            name: data.name,
            department: data.store.toString(),
            value: data.value,
          };
          array.push(tempFormat);
        });

        this.crossSellingProducts.set(array);
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

  getMultiStoreCustomerInsights() {
    this.httpService.getMultiStoreCustomerInsights().subscribe({
      next: (data: any) => {
        let newCustomer = {
          name: 'New Customer',
        } as { name: string; value: number };
        let repeatedCustomer = {
          name: 'Repeated Customer',
        } as { name: string; value: number };
        if (this.filter === 'sales') {
          newCustomer['value'] = Math.round(data[0]['data'][0]['value'][1]);
          repeatedCustomer['value'] = Math.round(
            data[0]['data'][1]['value'][1]
          );
        } else {
          newCustomer['value'] = Math.round(data[0]['data'][0]['value'][0]);
          repeatedCustomer['value'] = Math.round(
            data[0]['data'][1]['value'][0]
          );
          // Update the signal value with the extracted data
        }
        this.customerData.set([repeatedCustomer, newCustomer]);
      },
      error: (e) => console.log(e),
    });
  }
}
