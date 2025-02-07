import { Component } from '@angular/core';
import { CustomerInsightsComponent } from '../../shared/customer-insights/customer-insights.component';

@Component({
  selector: 'app-department-analysis',
  imports: [CustomerInsightsComponent],
  templateUrl: './department-analysis.component.html',
  styleUrl: './department-analysis.component.css',
})
export class DepartmentAnalysisComponent {}
