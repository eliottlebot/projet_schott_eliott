import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth-guard';

export const pollutionRoutes: Routes = [
  {
    path: 'pollution',
    loadChildren: () => import('../modules/pollution.module').then((m) => m.PollutionModule),
    canActivate: [AuthGuard],
  },
];
