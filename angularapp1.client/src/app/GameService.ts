import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl: string = isDevMode() ? '/game_state' : 'https://www.thedummystoretest.site/game_state';

  constructor(private http: HttpClient) { }

  // Method to make GET request with a parameter
  getGame(gameId: string): Observable<any> {
    //const params = new HttpParams().set('gameId', gameId);  // Set the gameId parameter
    //params.set('testvalue', 123);

    //console.log('params: ' + params);

    //return this.http.get(`${this.apiUrl}/${gameId}`, { params });  // Make the GET request
    this.apiUrl = isDevMode() ? 'http://127.0.0.1:8000/game_state' : 'https://www.thedummystoretest.site/game_state';
    return this.http.get(`${this.apiUrl}/${gameId}`); 
  }

  updateGame(gameId: string, updatedData: any): Observable<any> {
    this.apiUrl = isDevMode() ? 'http://127.0.0.1:8000/update_game' : 'https://www.thedummystoretest.site/update_game';
    const url = `${this.apiUrl}/${gameId}`;
    console.log(`Sending PUT request to: ${url}`);
    return this.http.put(url, updatedData);
  }

  deleteGame(gameId: string): Observable<any> {
    this.apiUrl = isDevMode() ? 'http://127.0.0.1:8000' : 'https://www.thedummystoretest.site';
    return this.http.delete(`${this.apiUrl}/delete_game/${gameId}`);
  }
}
