import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'app-users',
  imports: [SignupFormComponent],
  templateUrl: './users.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
