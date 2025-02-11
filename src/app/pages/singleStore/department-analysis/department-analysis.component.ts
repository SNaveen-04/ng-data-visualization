import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { data } from '../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { DepartmentBarChartComponent } from '../../../shared/d3-bar-chart/department-bar-chart/horizontal-bar-chart.component';
import { HttpService } from '../../../service/http-service.service';
import { listData } from '../../../type';
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
  data!: LineChartData;
  listElements: listData = [];
  selected = '';

  constructor() {
    Object.assign(this, { data });
  }

  ngOnInit() {
    this.httpService.getDepartmentsList().subscribe({
      next: (data) => {
        this.listElements = data.map((d) => d);
        this.selected = this.listElements[0].name;
      },
      error: (e) => console.log(e),
    });
  }
  select(value: string) {
    this.selected = value;
  }
}
