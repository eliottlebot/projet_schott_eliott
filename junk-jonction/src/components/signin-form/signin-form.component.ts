import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { Store } from '@ngxs/store';
import { SetToken } from '../../actions/token-actions';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signin-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninFormComponent implements OnInit {
  @Input() formTitle: string = 'Créer un compte';

  private readonly store = inject(Store);

  signinFormGroup: FormGroup = new FormGroup({});

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.signinFormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  handleResetForm(): void {
    this.signinFormGroup.reset();
  }

  // SIGNIN
  onSignin(): void {
    const { login, pass } = this.signinFormGroup.value;
    if (!login || !pass) {
      alert('Veuillez remplir tous les champs de connexion.');
      return;
    }

    this.userService
      .signin(this.signinFormGroup.value)
      .pipe(first())
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
