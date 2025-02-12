import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../../shared/product-sales/product-sales.component';
import { customerData } from '../../../../data';
import { LineChartdata } from '../../../../data';
import { DropDownComponent } from '../../../shared/drop-down/drop-down.component';
import { listData } from '../../../type';
import { HttpService } from '../../../service/http-service.service';

@Component({
  selector: 'app-operator-analysis',
  imports: [
    CustomerInsightsComponent,
    // LineChartComponent,
    DropDownComponent,
    ProductSalesComponent,
  ],
  templateUrl: './operator-analysis.component.html',
  styleUrl: './operator-analysis.component.css',
})
export class OperatorAnalysisComponent {
  private httpService = inject(HttpService);
  customerData = customerData;
  filter = '';
  LineChartdata!: LineChartData;
  listElements: listData = [];
  selected = '';
  constructor() {
    Object.assign(this, { LineChartdata });
  }

  ngOnInit() {
    this.filter = this.httpService.getTargetValue();
    this.httpService.getDepartmentsList().subscribe({
      next: (data) => {
        console.log(data);
        this.listElements = data;
        this.selected = this.listElements[0].name;
      },
      error: (error) => console.log(error),
    });
  }

  select(value: string) {
    console.log(value);
    this.selected = value;
  }
}
