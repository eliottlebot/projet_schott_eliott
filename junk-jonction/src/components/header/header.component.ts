import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  List,
  LucideAngularModule,
  LucideHouse,
  User,
  ChevronUp,
  OctagonAlert,
  Heart,
  LogOut,
} from 'lucide-angular';
import { UnsetToken } from '../../actions/token-actions';
import { TokenState } from '../../state/token-state';
import { UserState } from '../../state/user-state';
import { UnsetUser } from '../../actions/user-actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LucideAngularModule, CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly LucideHouse = LucideHouse;
  readonly User = User;
  readonly List = List;
  readonly ChevronUp = ChevronUp;
  readonly OctagonAlert = OctagonAlert;
  readonly Heart = Heart;
  readonly LogOut = LogOut;

  private readonly store = inject(Store);
  private readonly router = inject(Router);
  readonly token$ = this.store.select(TokenState.token);
  readonly user$ = this.store.select(UserState.user);

  dropdownOpened: boolean = false;

  toggleDropdown() {
    this.dropdownOpened = !this.dropdownOpened;
  }

  logout() {
    this.store.dispatch(new UnsetToken());
    this.store.dispatch(new UnsetUser());
    this.router.navigate(['/']);
  }
}
