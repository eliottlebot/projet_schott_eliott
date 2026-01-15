import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { Pollution } from '../models/types/Pollution';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PollutionService {
  private apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}

  createPollution(pollution: Pollution): Observable<Pollution> {
    return this.http.post<Pollution>(`${this.apiURL}/pollutions`, pollution);
  }

  getPollutions(): Observable<Pollution[]> {
    return this.http.get<Pollution[]>(`${this.apiURL}/pollutions`);
  }

  getPollutionDetail(id: number): Observable<Pollution | null> {
    return this.http.get<Pollution>(`${this.apiURL}/pollutions/${id}`);
  }

  updatePollution(updatedPollution: Pollution): Observable<Pollution> {
    return this.http.put<Pollution>(
      `${this.apiURL}/pollutions/${updatedPollution.id}`,
      updatedPollution
    );
  }

  deletePollution(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiURL}/pollutions/${id}`);
  }
}
