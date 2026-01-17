import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { Pollution } from '../../models/types/Pollution';
import { DatePipe } from '@angular/common';
import { Info, LucideAngularModule, Trash } from 'lucide-angular';
import { PollutionService } from '../../services/pollution.service';
import { Store } from '@ngxs/store';
import { UnsetFavorite } from '../../actions/favorites-actions';
import { DialogRef } from '@angular/cdk/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-pollution-item',
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './pollution-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PollutionItemComponent {
  @Input() pollution!: Pollution;
  @Output() deletePollution = new EventEmitter<number>();
  @Output() showDetails = new EventEmitter<Pollution>();

  Trash = Trash;
  Info = Info;

  constructor(private favoriteService: FavoriteService, private userService: UserService) {}

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }

  toggleFavorite(id: number): void {
    this.favoriteService.toggleFavorite(id);
  }

  onDelete() {
    this.deletePollution.emit(this.pollution.id);
  }

  onShowDetails() {
    this.showDetails.emit(this.pollution);
  }
}
