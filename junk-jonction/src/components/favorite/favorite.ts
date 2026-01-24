import { Component, inject } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-favorite',
  imports: [AsyncPipe],
  templateUrl: './favorite.html',
})
export class Favorite {
  favoriteService = inject(FavoriteService);
  favoritesCount$ = this.favoriteService.favoritesCount$;
}
