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
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupFormComponent implements OnInit {
  @Input() formTitle: string = 'Créer un compte';

  private readonly store = inject(Store);

  showRecap: boolean = false;

  // Form groups
  signupFormGroup: FormGroup = new FormGroup({});
  signinFormGroup: FormGroup = new FormGroup({});

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // SIGNUP
    this.signupFormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      nom: new FormControl(''),
      prenom: new FormControl(''),
    });

    // SIGNIN
    this.signinFormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  // SIGNUP
  onSubmit(): void {
    if (!this.checkSignupData()) {
      alert('Please fill in all required fields.');
      return;
    }

    this.userService
      .signup(this.signupFormGroup.value)
      .pipe(first())
      .subscribe((userData) => {
        this.store.dispatch(new SetToken(userData.token));
        this.router.navigate(['/']);
      });
  }

  checkSignupData(): boolean {
    const { login, pass, confirmPassword } = this.signupFormGroup.value;
    return login && pass && confirmPassword;
  }

  handleResetForm(): void {
    this.signupFormGroup.reset();
    this.showRecap = false;
  }

  // SIGNIN
  onSignin(): void {
    console.log(this.signinFormGroup.value);
    const { login, pass } = this.signinFormGroup.value;
    if (!login || !pass) {
      alert('Veuillez remplir tous les champs de connexion.');
      return;
    }

    this.userService
      .signin(this.signinFormGroup.value)
      .pipe(first())
      .subscribe((userData) => {
        this.store.dispatch(new SetToken(userData.token));
        this.router.navigate(['/']);
      });
  }
}
