import { Routes } from '@angular/router';
import { DropDownComponent } from './shared/drop-down/drop-down.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'analysis',
    pathMatch: 'full',
  },
  // {
  //   path: '**',
  //   component: DropDownComponent,
  // },
];
