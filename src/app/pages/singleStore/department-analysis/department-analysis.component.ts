import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { LineChartdata } from '../../../../data';
import { customerData } from '../../../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { HttpService } from '../../../service/http-service.service';
import { listData } from '../../../type';
import { DepartmentBarChartComponent } from '../../../shared/d3-bar-chart/department-bar-chart/department-bar-chart.component';
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
  LineChartdata!: LineChartData;
  listElements: listData = [];
  selected = '';

  constructor() {
    Object.assign(this, { LineChartdata });
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
