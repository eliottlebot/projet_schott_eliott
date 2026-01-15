import { Routes } from '@angular/router';
import { UsersComponent } from '../components/users/users';

export const userRoutes: Routes = [
  {
    path: 'user/signup',
    component: UsersComponent,
    title: 'User Signup',
  },
];
