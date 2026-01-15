import { Routes } from '@angular/router';
import { pollutionRoutes } from '../routes/pollutions.routes';
import { userRoutes } from '../routes/user.routes';
import { FrontPage } from '../components/front-page/front-page';

export const routes: Routes = [
  ...pollutionRoutes,
  ...userRoutes,
  { path: '', component: FrontPage },
  { path: '**', redirectTo: '' },
];
