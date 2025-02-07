import { Routes } from '@angular/router';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { StoreAnalysisComponent } from './pages/store-analysis/store-analysis.component';
import { ProductAnalysisComponent } from './pages/product-analysis/product-analysis.component';
import { DepartmentAnalysisComponent } from './pages/department-analysis/department-analysis.component';
import { OperatorAnalysisComponent } from './pages/operator-analysis/operator-analysis.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'analysis',
    pathMatch: 'full',
  },
  {
    path: 'analysis',
    component: StoreAnalysisComponent,
  },
  {
    path: 'product',
    component: ProductAnalysisComponent,
  },
  {
    path: 'department',
    component: DepartmentAnalysisComponent,
  },
  {
    path: 'operator',
    component: OperatorAnalysisComponent,
  },
  {
    path: '**',
    component: LineChartComponent,
  },
];
