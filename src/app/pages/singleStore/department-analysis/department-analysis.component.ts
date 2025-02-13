import { Component, inject, signal } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { HttpService } from '../../../service/http-service.service';
import { customerInsightsData, listData, timeFrame } from '../../../type';
import { DepartmentBarChartComponent } from '../../../shared/department-bar-chart/department-bar-chart.component';

@Component({
  selector: 'app-department-analysis',
  imports: [
    CustomerInsightsComponent,
    LineChartComponent,
    DropDownComponent,
    DepartmentBarChartComponent,
  ],
  templateUrl: './department-analysis.component.html',
  styleUrl: './department-analysis.component.css',
})
export class DepartmentAnalysisComponent {
  private httpService = inject(HttpService);
  customerData = signal<customerInsightsData>([]);
  LineChartdata: LineChartData = [];
  filter = '';
  SellingProducts: {
    name: string;
    value: number;
  }[] = [];
  yAxisLabel: 'sales' | 'quantity' = 'sales';

  get topSellingProducts() {
    return this.SellingProducts;
  }
  listElements: listData = [];
  selected = {
    id: '',
    name: '',
  };
  isLoaded = false;
  timeFrame: timeFrame = 'month';

  ngOnInit() {
    const subscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        this.yAxisLabel = d;
        this.getDepartmentAnalysis();
      },
    });
    this.filter = this.httpService.getTargetValue();
    this.getDepartmentLists();
  }

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getDepartmentAnalysis();
    }
  }

  getDepartmentAnalysis() {
    this.getDepartmentTrends();
    this.getProductPerformance();
    this.getCustomerInsights();
  }

  getDepartmentTrends() {
    this.httpService
      .getDepartmentTrends([this.selected.id], this.timeFrame)
      .subscribe({
        next: (data) => {
          this.LineChartdata = data;
          this.isLoaded = true;
        },
        error: (error) => console.log(error),
      });
  }

  getDepartmentLists() {
    this.httpService.getDepartmentsList().subscribe({
      next: (data) => {
        this.listElements = data.map((d) => d);
        this.selected = this.listElements[0];
        this.getDepartmentTrends();
        this.getProductPerformance();
        this.getCustomerInsights();
      },
      error: (e) => console.log(e),
    });
  }

  getProductPerformance() {
    this.httpService
      .getProductPerformance(this.selected.id, this.timeFrame)
      .subscribe({
        next: (data) => {
          this.SellingProducts = data[0].data
            .filter((_, index) => index < 5)
            .map((d) => d);
        },
        error: (e) => console.log(e),
      });
  }

  getCustomerInsights() {
    this.httpService
      .getDepartmentCustomerInsights(this.selected.id, this.timeFrame)
      .subscribe({
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
          }
          console.log('CI : ', this.customerData());
        },
        error: (e) => console.log(e),
      });
  }
}
