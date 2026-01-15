import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { PollutionService } from '../../services/pollution.service';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { LucideAngularModule, Trash2, Info, Heart } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';
import { PollutionDetailsModal } from '../pollution-details-modal/pollution-details-modal';
import { FavoriteService } from '../../services/favorite.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pollution-favorites-list',
  imports: [CommonModule, AsyncPipe, DatePipe, LucideAngularModule, PollutionDetailsModal],
  templateUrl: './pollution-favorites-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionFavoritesList {
  favoritePollutions$: Observable<Pollution[]>;
  selectedPollution$: Signal<Pollution | null>;
  Trash = Trash2;
  Info = Info;
  Heart = Heart;

  private readonly favoriteService = inject(FavoriteService);
  private readonly pollutionService = inject(PollutionService);

  favoritesCount$ = this.favoriteService.favoritesCount$;

  constructor() {
    this.favoritePollutions$ = this.favoriteService
      .getFavorites$()
      .pipe(
        switchMap((favoriteIds) =>
          this.pollutionService
            .getPollutions()
            .pipe(map((pollutions) => pollutions.filter((p) => favoriteIds.includes(p.id))))
        )
      );

    this.selectedPollution$ = toSignal(
      this.pollutionService.getPollutions().pipe(map(() => null)),
      { initialValue: null }
    );
  }

  deletePollution(id: number) {
    this.pollutionService.deletePollution(id).subscribe(() => {
      // Rafraîchir la liste
      this.favoritePollutions$ = this.favoriteService
        .getFavorites$()
        .pipe(
          switchMap((favoriteIds) =>
            this.pollutionService
              .getPollutions()
              .pipe(map((pollutions) => pollutions.filter((p) => favoriteIds.includes(p.id))))
          )
        );
    });
  }

  showDetails(id: number) {
    this.pollutionService.getPollutionDetail(id).subscribe((pollution) => {
      this.selectedPollution$ = toSignal(
        new Observable((observer) => {
          observer.next(pollution);
        }),
        { initialValue: pollution }
      );
    });
  }

  closeModal = () => {
    this.selectedPollution$ = toSignal(
      new Observable((observer) => {
        observer.next(null);
      }),
      { initialValue: null }
    );
  };

  sortByDate() {
    this.favoritePollutions$ = this.favoritePollutions$.pipe(
      map((pollutions) =>
        [...pollutions].sort(
          (a, b) => new Date(b.date_observation).getTime() - new Date(a.date_observation).getTime()
        )
      )
    );
  }

  resetSorting() {
    this.favoritePollutions$ = this.favoriteService
      .getFavorites$()
      .pipe(
        switchMap((favoriteIds) =>
          this.pollutionService
            .getPollutions()
            .pipe(map((pollutions) => pollutions.filter((p) => favoriteIds.includes(p.id))))
        )
      );
  }

  removeFavorite(id: number): void {
    this.favoriteService.removeFavorite(id);
  }
}
