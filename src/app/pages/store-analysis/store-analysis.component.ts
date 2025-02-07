import { Component } from '@angular/core';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from '../../shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component';

@Component({
  selector: 'app-store-analysis',
  imports: [HorizontalBarChartComponent, LineChartComponent],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {}
