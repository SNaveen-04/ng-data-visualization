import { Routes } from '@angular/router';
import { LineChartComponent } from './shared/line-chart/line-chart.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'analysis',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: LineChartComponent,
  },

];
