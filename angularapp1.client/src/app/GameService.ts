import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domino } from '../classes/Domino';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl: string = isDevMode() ? 'http://127.0.0.1:8000' : 'https://www.thedummystoretest.site';

  constructor(private http: HttpClient) { }

  getGame(gameId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/game_state/${gameId}`); 
  }

  postGame(domino: any) {
    return this.http.post(`${this.apiUrl}/create_game`, domino);  // Corrected to POST, and expecting the correct data format
  }

  updateGame(gameId: string, updatedData: any): Observable<any> {
    const url = `${this.apiUrl}/update_game/${gameId}`;
    console.log(`Sending PUT request to: ${url}`);
    return this.http.put(url, updatedData);
  }

  deleteGame(gameId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete_game/${gameId}`);
  }
}
