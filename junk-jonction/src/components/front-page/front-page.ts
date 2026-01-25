import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, MoveRight } from 'lucide-angular';
import { AuthenticatedUser } from '../../models/types/AuthenticatedUser';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { UserState } from '../../state/user-state';
import { UserService } from '../../services/user.service';
import { PollutionService } from '../../services/pollution.service';

@Component({
  selector: 'app-front-page',
  imports: [RouterModule, LucideAngularModule, AsyncPipe],
  templateUrl: './front-page.html',
  standalone: true,
  host: {
    class:
      'flex items-center justify-center bg-[url(/jj-bg.webp)] h-full flex-1 bg-cover bg-center flex-col',
  },
})
export class FrontPage {
  readonly MoveRight = MoveRight;
  private store = inject(Store);
  private pollutionService = inject(PollutionService);
  user$ = this.store.select(UserState.user);
  pollutionCount$: Observable<number> = this.pollutionService.getPollutionsCount();
}
