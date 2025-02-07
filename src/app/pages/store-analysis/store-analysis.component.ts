import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'app-store-analysis',
  imports: [LineChartComponent,CustomerInsightsComponent],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {}
