import { Routes } from '@angular/router';
import { SignupFormComponent } from '../components/signup-form/signup-form.component';
import { SigninFormComponent } from '../components/signin-form/signin-form.component';

export const userRoutes: Routes = [
  {
    path: 'user/signup',
    component: SignupFormComponent,
    title: 'User Signup',
  },
  {
    path: 'user/signin',
    component: SigninFormComponent,
    title: 'User Signin',
  },
];
