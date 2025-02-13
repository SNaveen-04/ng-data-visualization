import { Component, DestroyRef, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import {
  LineChartComponent,
  LineChartData,
} from '../../shared/line-chart/line-chart.component';
import { ProductSalesComponent } from '../../shared/product-sales/product-sales.component';
import { customerData } from '../../../data';
import { LineChartdata } from '../../../data';
import { DropDownComponent } from '../../shared/drop-down/drop-down.component';
import { listData, operatorResponse, timeFrame } from '../../type';
import { HttpService } from '../../service/http-service.service';

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

  customerData = customerData;
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
          this.getOperatorTrends();
        }
      },
    });
    const timeFrameSubscriber = this.httpService.timeFrame$.subscribe({
      next: (data) => {
        if (this.timeFrame !== data) {
          this.timeFrame = data;
          this.getOperatorTrends();
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
        this.getOperatorTrends();
      },
      error: (error) => console.log(error),
    });
  }

  select(value: any) {
    this.selected = value;
    this.getOperatorTrends();
  }
}
