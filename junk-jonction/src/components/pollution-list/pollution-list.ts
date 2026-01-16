import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PollutionService } from '../../services/pollution.service';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { LucideAngularModule, Trash2, Info, Heart } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';
import { PollutionDetailsModal } from '../pollution-details-modal/pollution-details-modal';
import { FavoriteService } from '../../services/favorite.service';
import { UnsetFavorite } from '../../actions/favorites-actions';
import { Store } from '@ngxs/store';
import { PollutionItemComponent } from '../pollution-item/pollution-item.component';

@Component({
  selector: 'app-pollution-list',
  imports: [CommonModule, AsyncPipe, LucideAngularModule, PollutionItemComponent],
  templateUrl: './pollution-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionList {
  private readonly favoriteService = inject(FavoriteService);
  private readonly store = inject(Store);
  private readonly dialog = inject(Dialog);

  pollutionList$: Observable<Pollution[]>;
  selectedPollution$ = new BehaviorSubject<Pollution | null>(null);
  Trash = Trash2;
  Info = Info;
  Heart = Heart;

  favoritesCount$ = this.favoriteService.favoritesCount$;

  constructor(private pollutionService: PollutionService) {
    this.pollutionList$ = this.pollutionService.getPollutions();
  }

  sortByDate() {
    this.pollutionList$ = this.pollutionList$.pipe(
      map((pollutions) =>
        [...pollutions].sort(
          (a, b) => new Date(b.dateObservation).getTime() - new Date(a.dateObservation).getTime()
        )
      )
    );
  }

  resetSorting() {
    this.pollutionList$ = this.pollutionService.getPollutions();
  }

  deletePollution(id: number) {
    this.pollutionService.deletePollution(id).subscribe(() => {
      this.store.dispatch(new UnsetFavorite(id));
      this.pollutionList$ = this.pollutionService.getPollutions();
    });
  }

  showDetails(pollution: Pollution) {
    this.dialog.open(PollutionDetailsModal, {
      data: pollution,
    });
  }
}
