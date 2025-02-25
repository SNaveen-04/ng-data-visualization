import { Routes } from '@angular/router';
import { StoreAnalysisComponent } from './pages/store-analysis/store-analysis.component';
import { DepartmentAnalysisComponent } from './pages/department-analysis/department-analysis.component';
import { OperatorAnalysisComponent } from './pages/operator-analysis/operator-analysis.component';
import { LocalityAnalysisComponent } from './pages/locality-analysis/locality-analysis.component';

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
        loadComponent: () =>
          import('./pages/product-analysis/product-analysis.component').then(
            (c) => c.ProductAnalysisComponent
          ),
      },
      // {
      //   path: 'department',
      //   loadComponent: () =>
      //     import(
      //       './pages/department-analysis/department-analysis.component'
      //     ).then((c) => c.DepartmentAnalysisComponent),
      // },
      {
        path: 'operator',
        loadComponent: () =>
          import('./pages/operator-analysis/operator-analysis.component').then(
            (c) => c.OperatorAnalysisComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/operator-analysis/operator-analysis.component').then(
            (c) => c.OperatorAnalysisComponent
          ),
      },
    ],
  },
  {
    path: 'multi',
    children: [
      {
        path: '',
        redirectTo: 'overall',
        pathMatch: 'full',
      },
      {
        path: 'overall',
        component: LocalityAnalysisComponent,
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
            loadComponent: () =>
              import(
                './pages/product-analysis/product-analysis.component'
              ).then((c) => c.ProductAnalysisComponent),
          },
          // {
          //   path: 'department',
          //   loadComponent: () =>
          //     import(
          //       './pages/department-analysis/department-analysis.component'
          //     ).then((c) => c.DepartmentAnalysisComponent),
          // },
          {
            path: 'operator',
            loadComponent: () =>
              import(
                './pages/operator-analysis/operator-analysis.component'
              ).then((c) => c.OperatorAnalysisComponent),
          },
          {
            path: '**',
            loadComponent: () =>
              import(
                './pages/product-analysis/product-analysis.component'
              ).then((c) => c.ProductAnalysisComponent),
          },
        ],
      },
    ],
  },
];
