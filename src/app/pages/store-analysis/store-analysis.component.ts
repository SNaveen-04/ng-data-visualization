import { Component, inject } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component';
import { data } from '../data';
import { HttpServiceService } from '../../service/http-service.service';
import { CrossSellingBarChartComponent } from '../../shared/d3-bar-chart/cross-selling-bar-chart/horizontal-bar-chart.component';
@Component({
  selector: 'app-store-analysis',
  imports: [
    LineChartComponent,
    CustomerInsightsComponent,
    HorizontalBarChartComponent,
    CrossSellingBarChartComponent
  ],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {
  private httpService = inject(HttpServiceService);
  data!: {
    name: string;
    color: string;
    series: {
      name: string;
      value: string;
    }[];
  }[];

  // constructor() {
  //   Object.assign(this, { data });
  // }

  ngOnInit() {
    this.httpService.getLineChartData().subscribe({
      next: (data) => {
        this.data = data as {
          name: string;
          color: string;
          series: { name: string; value: string }[];
        }[];
        // console.log(this.data);
      },
      error: (error) => console.log(error),
    });
  }
}
