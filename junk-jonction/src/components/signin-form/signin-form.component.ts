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
import { LoaderComponent } from '../loader/loader';
import { AuthError } from '../../models/AuthContext';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-signup-form',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, LoaderComponent, AsyncPipe],
  templateUrl: './signin-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex items-center justify-center bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center',
  },
})
export class SigninFormComponent implements OnInit {
  @Input() formTitle: string = 'Se connecter';

  message$ = new BehaviorSubject('');
  isLoading$ = new BehaviorSubject(false);

  signinFormGroup: FormGroup = new FormGroup({});

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.signinFormGroup = new FormGroup({
      login: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
    });
  }

  handleResetForm(): void {
    this.signinFormGroup.reset();
  }

  onSignin(): void {
    this.message$.next('');
    this.isLoading$.next(true);
    const { login, pass } = this.signinFormGroup.value;
    if (!login || !pass) {
      this.message$.next('Veuillez remplir tous les champs.');
      this.isLoading$.next(false);
      return;
    }

    this.userService.signin(this.signinFormGroup.value).subscribe({
      next: () => {},
      error: (error: AuthError) => {
        this.isLoading$.next(false);
        this.message$.next(error.message);
      },
    });
  }
}
