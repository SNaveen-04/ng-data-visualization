import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../../shared/product-sales/product-sales.component';
import { customerData } from '../../../../data';
import { LineChartdata } from '../../../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import {
  customerInsightsData,
  listData,
  operatorResponse,
  timeFrame,
} from '../../../type';
import { HttpService } from '../../../service/http-service.service';

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
  private httpService = inject(HttpService);
  private destroyRef = inject(DestroyRef);
  customerData = signal<customerInsightsData>([]);
  filter = '';
  LineChartdata!: LineChartData;
  yAxisLabel: 'sales' | 'quantity' = 'sales';
  listElements: operatorResponse[] = [];
  selected: operatorResponse = {
    id: '',
    name: '',
    storeId: '',
  };
  timeFrame: timeFrame = 'month';
  constructor() {
    Object.assign(this, { LineChartdata });
  }

  ngOnInit() {
    const targetSubscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        this.filter = d;
        this.yAxisLabel = d;
        this.getOperatorAnalysis();
      },
    });
    const storeSubscriber = this.httpService.storeId$.subscribe({
      next: () => {
        this.getOperatorList();
      },
    });
    const timeFrameSubscriber = this.httpService.timeFrame$.subscribe({
      next: (data) => {
        if (this.timeFrame !== data) {
          this.timeFrame = data;
          this.getOperatorList();
        }
      },
    });
    this.destroyRef.onDestroy(() => {
      targetSubscriber.unsubscribe();
      storeSubscriber.unsubscribe();
      timeFrameSubscriber.unsubscribe();
    });
  }

  getOperatorTrends() {
    this.httpService.getOperatorTrends(this.selected.id).subscribe({
      next: (data) => console.log(data),
    });
  }
  getOperatorList() {
    this.httpService.getOperatorList().subscribe({
      next: (data) => {
        this.listElements = data;
        this.selected = this.listElements[0];
        this.getOperatorTrends();
        this.getOperatorCustomerInsights();
      },
      error: (error) => console.log(error),
    });
  }

  getOperatorAnalysis() {
    this.getOperatorTrends();
    this.getOperatorCustomerInsights();
  }
  select(value: any) {
    this.selected = value;
    this.getOperatorAnalysis();
  }
  getOperatorCustomerInsights() {
    console.log('Selected id : ', this.selected.id);

    this.httpService.getOperatorCustomerInsights(this.selected.id).subscribe({
      next: (data: any) => {
        this.customerData.set([]);
        console.log('ci data :', data);
        console.log('Before assigning : ', this.customerData());

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
          console.log('New customer : ', newCustomer);
          console.log('Repeated  customer : ', regularCustomer);

          // Update the signal value with the extracted data
          this.customerData.set([regularCustomer, newCustomer]);
        }
        console.log('CI : ', this.customerData());
      },
      error: (error) => console.log(error),
    });
  }
}
