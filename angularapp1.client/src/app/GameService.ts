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
    return this.http.get(`${this.apiUrl}/${gameId}`); 
  }
}
