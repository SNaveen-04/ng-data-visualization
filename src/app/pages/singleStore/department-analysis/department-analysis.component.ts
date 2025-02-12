import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { customerData } from '../../../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { HttpService } from '../../../service/http-service.service';
import { listData, timeFrame } from '../../../type';
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
  customerData = customerData;
  LineChartdata: LineChartData = [];
  newCustomerInsights = {};
  repeatedCustomerInsights = {};
  SellingProducts: {
    name: string;
    value: number;
  }[] = [];

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
        this.getDepartmentTrends();
        console.log(d);
      },
    });
    this.getDepartmentLists();
  }

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getDepartmentTrends();
      this.getProductPerformance();
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
          this.newCustomerInsights = data[0][0];
          this.repeatedCustomerInsights = data[0][1];
        },
        error: (e) => console.log(e),
      });
  }
}
