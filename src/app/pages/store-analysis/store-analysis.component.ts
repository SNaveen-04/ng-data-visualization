import { Component } from '@angular/core';
import { HorizontalBarChartComponent } from '../../shared/d3-bar-chart/horizontal-bar-chart/horizontal-bar-chart.component';

@Component({
  selector: 'app-store-analysis',
  imports: [HorizontalBarChartComponent],
  templateUrl: './store-analysis.component.html',
  styleUrl: './store-analysis.component.css'
})
export class StoreAnalysisComponent {

}
