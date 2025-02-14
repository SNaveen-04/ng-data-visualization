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
  timeFrame: timeFrame = 'month';

  ngOnInit() {
    this.filter = this.httpService.getTargetValue();
    this.getLocalityTrends();
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
      timeFrameSubscriber.unsubscribe();
    });
  }

  getProductAnalysis() {
    this.getLocalityTrends();
    // this.getCrossSellingProducts();
    // this.getProductCustomerInsights();
  }

  getLocalityTrends() {
    this.httpService.getLocalityTrends().subscribe({
      next: (data) => {
        this.LineChartdata = data;
        this.isLoaded = true;
      },
      error: (error) => console.log(error),
    });
  }

  getCrossSellingProducts() {
    this.httpService.getCrossSellingProducts([this.selected.id]).subscribe({
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
        this.crossSellingProducts.set(
          d[0].data.filter((_, index) => index < 5)
        );
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
    this.httpService.getProductCustomerInsights(this.selected.id).subscribe({
      next: (data: any) => {
        console.log('ci data :', data);

        if (this.filter === 'sales') {
          let newCustomer = {
            name: data[0]['data'][0]['name'],
            value: Math.round(data[0]['data'][0]['value'][1]),
          };

          let regularCustomer = {
            name: data[0]['data'][1]['name'],
            value: Math.round(data[0]['data'][1]['value'][1]),
          };

          // Update the signal value with the extracted data
          this.customerData.set([regularCustomer, newCustomer]);
        } else {
          let newCustomer = {
            name: data[0]['data'][0]['name'],
            value: Math.round(data[0]['data'][0]['value'][0]),
          };

          let regularCustomer = {
            name: data[0]['data'][1]['name'],
            value: Math.round(data[0]['data'][1]['value'][0]),
          };

          // Update the signal value with the extracted data
          this.customerData.set([regularCustomer, newCustomer]);
        }
        console.log('CI : ', this.customerData());
      },
      error: (e) => console.log(e),
    });
  }
}
