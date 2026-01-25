import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Pollution } from '../models/types/Pollution';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngxs/store';
import { UnsetFavorite } from '../actions/favorites-actions';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  createPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(`${this.apiURL}/pollutions`, pollution);
  }

  getPollutions(query?: string): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(`${this.apiURL}/pollutions`, {
      params: query ? { query } : {},
    });
  }

  getPollutionDetail(id: number): Observable<Pollution | null> {
    return this.http.get<Pollution>(`${this.apiURL}/pollutions/${id}`);
  }

  updatePollution(updatedPollution: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(
      `${this.apiURL}/pollutions/${updatedPollution.id}`,
      updatedPollution,
    );
  }

  getPollutionsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiURL}/pollutions/count`);
  }

  deletePollution(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/pollutions/${id}`);
  }
}
