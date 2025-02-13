import { Component, DestroyRef, inject, signal } from '@angular/core';
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
  private destroyRef = inject(DestroyRef);
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
    this.filter = this.httpService.getTargetValue();
    const targetSubscriber = this.httpService.targetValue$.subscribe({
      next: (d) => {
        this.yAxisLabel = d;
        this.getDepartmentAnalysis();
      },
    });
    const storeSubscriber = this.httpService.storeId$.subscribe({
      next: () => {
        this.getDepartmentLists();
        this.getDepartmentAnalysis();
      },
    });
    this.destroyRef.onDestroy(() => {
      targetSubscriber.unsubscribe();
      storeSubscriber.unsubscribe();
    });
  }

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getDepartmentAnalysis();
    }
  }

  getDepartmentAnalysis() {
    if (this.selected.id !== '') {
      this.getDepartmentTrends();
      this.getProductPerformance();
      this.getCustomerInsights();
    }
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
        next: (data) => {
          console.log(data);
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
