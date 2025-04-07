import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = '/game_state';  // Replace with your API base URL

  constructor(private http: HttpClient) { }

  // Method to make GET request with a parameter
  getGame(gameId: string): Observable<any> {
    //const params = new HttpParams().set('gameId', gameId);  // Set the gameId parameter
    //params.set('testvalue', 123);

    //console.log('params: ' + params);

    //return this.http.get(`${this.apiUrl}/${gameId}`, { params });  // Make the GET request
    console.log("Game data sent: 67f425053426eebe4684abca");
    return this.http.get(`${this.apiUrl}/67f425053426eebe4684abca`); 
  }
}
