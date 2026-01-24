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
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoaderComponent } from '../loader/loader';
import { AsyncPipe } from '@angular/common';
import { AuthError } from '../../models/AuthContext';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, LoaderComponent, AsyncPipe],
  templateUrl: './signup-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex items-center justify-center bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center',
  },
})
export class SignupFormComponent implements OnInit {
  @Input() formTitle: string = 'Créer un compte';

  message$ = new BehaviorSubject('');
  isLoading$ = new BehaviorSubject(false);

  signupFormGroup: FormGroup = new FormGroup({});

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signupFormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      nom: new FormControl(''),
      prenom: new FormControl(''),
    });
  }

  onSubmit(): void {
    this.message$.next('');
    this.isLoading$.next(true);

    if (!this.checkSignupData()) {
      this.message$.next('Veuillez remplir tous les champs.');
      this.isLoading$.next(false);
      return;
    }

    this.userService
      .signup(this.signupFormGroup.value)
      .pipe(first())
      .subscribe({
        next: () => {},
        error: (error: AuthError) => {
          this.isLoading$.next(false);
          this.message$.next(error.message);
        },
      });
  }

  checkSignupData(): boolean {
    const { login, pass, confirmPassword } = this.signupFormGroup.value;
    if (!login || !pass || !confirmPassword) {
      return false;
    }
    return true;
  }

  handleResetForm(): void {
    this.signupFormGroup.reset();
  }
}
