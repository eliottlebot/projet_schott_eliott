import { inject, Signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { FavoriteState } from '../state/favorite-state';
import { toSignal } from '@angular/core/rxjs-interop';
import { GetFavoritesCount, SetFavorite, UnsetFavorite } from '../actions/favorites-actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private store = inject(Store);

  favorites: Signal<number[]> = toSignal(this.store.select(FavoriteState.favorites), {
    initialValue: this.loadFromLocalStorage(),
  });
  favoritesCount$ = this.store.select(FavoriteState.favoritesCount);

  private loadFromLocalStorage(): number[] {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
      return [];
    }
  }

  addFavorite(id: number): void {
    this.store.dispatch(new SetFavorite(id));
  }

  removeFavorite(id: number): void {
    this.store.dispatch(new UnsetFavorite(id));
  }

  getFavorites$(): Observable<number[]> {
    return this.store.select(FavoriteState.favorites);
  }

  toggleFavorite(id: number): void {
    if (this.isFavorite(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  isFavorite(id: number): boolean {
    return this.favorites().includes(id);
  }

  clearAllFavorites(): void {
    const currentFavorites = this.favorites();
    currentFavorites.forEach((id) => this.removeFavorite(id));
  }
}
