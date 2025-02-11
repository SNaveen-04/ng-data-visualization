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
  listElements: listData = [];
  selected = {
    id: '',
    name: '',
  };
  isLoaded = false;
  timeFrame: timeFrame = 'month';

  ngOnInit() {
    this.getDepartmentLists();
  }

  ngOnViewInit() {}

  select(value: any) {
    if (this.selected !== value) {
      this.selected = value;
      this.getDepartmentTrends(this.selected.id);
    }
  }

  getDepartmentTrends(id: string) {
    this.httpService
      .getDepartmentTrends(this.selected.id, this.timeFrame)
      .subscribe({
        next: (data) => {
          this.LineChartdata = data;
          console.log(data);
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
        this.getDepartmentTrends(this.selected.id);
      },
      error: (e) => console.log(e),
    });
  }
}
