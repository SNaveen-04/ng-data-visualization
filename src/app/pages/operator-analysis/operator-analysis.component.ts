import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../shared/product-sales/product-sales.component';
import { customerData } from '../../../data';
import { LineChartdata } from '../../../data';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import {
  customerInsightsData,
  listData,
  operatorResponse,
  timeFrame,
} from '../../type';
import { HttpService } from '../../service/http-service.service';

@Component({
  selector: 'app-operator-analysis',
  imports: [
    CustomerInsightsComponent,
    LineChartComponent,
    DropDownComponent,
    // ProductSalesComponent,
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
  ngOnInit() {
    this.filter = this.httpService.getTargetValue();
    this.timeFrame = this.httpService.getTimeFrame();
    const storeSubscriber = this.httpService.storeId$.subscribe({
      next: () => {
        this.getOperatorList();
      },
    });
    const targetSubscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        if (this.filter !== d) {
          console.log('--');
          this.filter = d;
          this.yAxisLabel = d;
          this.getOperatorAnalysis();
        }
      },
    });
    const timeFrameSubscriber = this.httpService.timeFrame$.subscribe({
      next: (data) => {
        if (this.timeFrame !== data) {
          this.timeFrame = data;
          this.getOperatorAnalysis();
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
      next: (data) => {
        this.LineChartdata = data;
      },
      error: (e) => console.log(e),
    });
  }
  getOperatorList() {
    this.httpService.getOperatorList().subscribe({
      next: (data) => {
        this.listElements = data;
        this.selected = this.listElements[0];
        this.getOperatorAnalysis();
      },
      error: (error) => console.log(error),
    });
  }

  select(value: any) {
    this.selected = value;
    this.getOperatorAnalysis();
  }
  getOperatorAnalysis() {
    this.getOperatorTrends();
    this.getOperatorCustomerInsights();
  }
  getOperatorCustomerInsights() {
    this.httpService.getOperatorCustomerInsights(this.selected.id).subscribe({
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
      error: (error) => console.log(error),
    });
    this.getOperatorTrends();
  }
}
