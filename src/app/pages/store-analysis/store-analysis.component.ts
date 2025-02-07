import { Component } from '@angular/core';
import { LineChartComponent } from '../../shared/line-chart/line-chart.component';

@Component({
  selector: 'app-store-analysis',
  imports: [LineChartComponent],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css',
})
export class StoreAnalysisComponent {}
