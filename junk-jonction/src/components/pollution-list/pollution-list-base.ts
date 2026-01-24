import { Directive, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { PollutionService } from '../../services/pollution.service';
import { Trash2, Info, Heart, Search, Loader } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';
import { PollutionDetailsModal } from '../pollution-details-modal/pollution-details-modal';
import { FavoriteService } from '../../services/favorite.service';
import { UnsetFavorite } from '../../actions/favorites-actions';
import { Store } from '@ngxs/store';
import { FormControl } from '@angular/forms';

@Directive()
export abstract class PollutionListBase {
  protected readonly favoriteService = inject(FavoriteService);
  protected readonly store = inject(Store);
  protected readonly dialog = inject(Dialog);
  protected readonly pollutionService = inject(PollutionService);

  abstract pollutionList$: Observable<Pollution[]>;

  selectedPollution$ = new BehaviorSubject<Pollution | null>(null);

  // Icons
  Trash = Trash2;
  Info = Info;
  Heart = Heart;
  Search = Search;
  Loader = Loader;

  protected readonly sortMode$ = new BehaviorSubject<'none' | 'dateDesc'>('none');
  favoritesCount$ = this.favoriteService.favoritesCount$;
  searchQueryControl = new FormControl('');

  protected sortPollutions(pollutions: Pollution[], sortMode: 'none' | 'dateDesc'): Pollution[] {
    if (sortMode === 'dateDesc') {
      return [...pollutions].sort(
        (a, b) => new Date(b.dateObservation).getTime() - new Date(a.dateObservation).getTime(),
      );
    }
    return pollutions;
  }

  sortByDate() {
    this.sortMode$.next('dateDesc');
  }

  resetSorting() {
    this.sortMode$.next('none');
  }

  deletePollution(id: number) {
    this.pollutionService.deletePollution(id).subscribe(() => {
      this.store.dispatch(new UnsetFavorite(id));
    });
  }

  showDetails(pollution: Pollution) {
    this.dialog.open(PollutionDetailsModal, {
      data: pollution,
    });
  }
}
