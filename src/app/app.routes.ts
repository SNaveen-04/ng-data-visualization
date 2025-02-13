import { Routes } from '@angular/router';
import { StoreAnalysisComponent } from './pages/store-analysis/store-analysis.component';
import { ProductAnalysisComponent } from './pages/product-analysis/product-analysis.component';
import { DepartmentAnalysisComponent } from './pages/department-analysis/department-analysis.component';
import { OperatorAnalysisComponent } from './pages/operator-analysis/operator-analysis.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'single/analysis',
    pathMatch: 'full',
  },
  {
    path: 'single',
    children: [
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
        component: OperatorAnalysisComponent,
      },
    ],
  },
  {
    path: 'multi',
    children: [
      {
        path: '',
        redirectTo: 'store/analysis',
        pathMatch: 'full',
      },
      {
        path: 'overall',
        component: StoreAnalysisComponent,
      },
      {
        path: 'store',
        children: [
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
            component: OperatorAnalysisComponent,
          },
        ],
      },
    ],
  },
];
