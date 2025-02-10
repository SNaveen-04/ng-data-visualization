import { Routes } from '@angular/router';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { StoreAnalysisComponent } from './pages/singleStore/store-analysis/store-analysis.component';
import { ProductAnalysisComponent } from './pages/singleStore/product-analysis/product-analysis.component';
import { DepartmentAnalysisComponent } from './pages/singleStore/department-analysis/department-analysis.component';
import { OperatorAnalysisComponent } from './pages/singleStore/operator-analysis/operator-analysis.component';

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
