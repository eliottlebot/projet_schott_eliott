import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';
import { PollutionItemComponent } from '../pollution-item/pollution-item.component';
import { PollutionListBase } from '../pollution-list/pollution-list-base';
import { Favorite } from '../favorite/favorite';
@Component({
  selector: 'app-pollution-favorites-list',
  imports: [CommonModule, AsyncPipe, LucideAngularModule, PollutionItemComponent, Favorite],
  templateUrl: './pollution-favorites-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionFavoritesList extends PollutionListBase {
  pollutionList$: Observable<Pollution[]>;

  constructor() {
    super();

    this.pollutionList$ = combineLatest([
      this.favoriteService.getFavorites$(),
      this.pollutionService.getPollutions().pipe(),
      this.sortMode$,
    ]).pipe(
      map(([favoriteIds, allPollutions, sortMode]) => {
        const favoritePollutions = allPollutions.filter((p) => favoriteIds.includes(p.id));
        return this.sortPollutions(favoritePollutions, sortMode);
      }),
    );
  }
}
