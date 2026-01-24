import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  combineLatest,
  debounceTime,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { Pollution } from '../../models/types/Pollution';
import { PollutionItemComponent } from '../pollution-item/pollution-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PollutionListBase } from './pollution-list-base';
import { Favorite } from '../favorite/favorite';

@Component({
  selector: 'app-pollution-list',
  imports: [
    CommonModule,
    AsyncPipe,
    LucideAngularModule,
    PollutionItemComponent,
    ReactiveFormsModule,
    Favorite,
  ],
  templateUrl: './pollution-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PollutionList extends PollutionListBase {
  pollutionList$: Observable<Pollution[]>;
  private readonly pollutionsFromApi$;

  constructor() {
    super();

    this.pollutionsFromApi$ = this.searchQueryControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((query) => this.pollutionService.getPollutions(query || undefined)),
      shareReplay(1),
    );

    this.pollutionList$ = combineLatest([this.pollutionsFromApi$, this.sortMode$]).pipe(
      map(([pollutions, sortMode]) => this.sortPollutions(pollutions, sortMode)),
    );
  }
}
