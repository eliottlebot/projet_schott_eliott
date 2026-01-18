import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PollutionModule } from '../modules/pollution.module';
import { HeaderComponent } from '../components/header/header.component';
import { SetUser, UnsetUser } from '../actions/user-actions';
import { UserService } from '../services/user.service';
import { Store } from '@ngxs/store';
import { UnsetToken } from '../actions/token-actions';

@Component({
  selector: 'app-root',
  imports: [PollutionModule, RouterModule, HeaderComponent],
  templateUrl: './app.html',
  host: {
    class: 'block h-full',
  },
})
export class App implements OnInit {
  protected readonly title = 'Junk Junction';

  private userService = inject(UserService);
  private store = inject(Store);
  private router = inject(Router);

  ngOnInit() {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        if (!user) {
          this.store.dispatch(new UnsetUser());
          return;
        }
        this.store.dispatch(new SetUser(user));
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur:", err);
        this.store.dispatch(new UnsetUser());
        this.store.dispatch(new UnsetToken());

        this.router.navigate(['/']);
      },
    });
  }
}
