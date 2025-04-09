import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Domino } from '../classes/Domino';
import { initialGameState } from '../classes/Domino';
import { GameService } from './GameService';

interface GameState {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
  domino: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  userEnteredGameName: string = '';
  gameToLoad: string = '';

  createGameClick() {
    console.log('userEnteredGameName: ', this.userEnteredGameName);
    this.createGameByName();
    this.userEnteredGameName = '';
    this.gameToLoad = '';
  }

  loadGameClick() {
    console.log('gameToLoad: ', this.gameToLoad);
    this.findGameByName(this.gameToLoad);
    this.userEnteredGameName = '';
    this.gameToLoad = '';
  }

  public game = initialGameState;

  public gameState: GameState = {
    date: '',
    temperatureC: 0,
    temperatureF: 0,
    summary: '',
    domino: ''
  }

  private dominoOne = {
    side_a: 0,
    side_b: 0
  };

  constructor(private http: HttpClient, private gameService: GameService) { }

  ngOnInit() {
  }

  deleteGameData(gameId: string) {
    this.gameService.deleteGame(gameId).subscribe(
      (response) => {
        console.log('DELETE Success:', response);
      },
      (error) => {
        console.error('Error deleting game:', error);
      }
    );
  }

  findGameByName(gameName: string) {
    this.gameService.findGameByName(gameName).subscribe(
      data => {
        console.log('GET findGameByName:', data);
        this.game = data;
        console.log('this.game: ', this.game);
        console.log('this.game.id: ', this.game.id);
        console.log('this.game.arena: ', this.game.arena);
      },
      error => {
        console.error('Error fetching game data:', error);
      }
    );
  }

  updateData() {
    this.gameService.updateGame('abc123', {
      player: 'Player 1',
      score: 99
    }).subscribe({
      next: (response) => console.log('PUT Success!', response),
      error: (err) => console.error('Update failed', err)
    });
  }

  getGameState() {
    let url: string = isDevMode() ? '/game_state' : 'https://www.thedummystoretest.site/game_state';
    this.http.get<GameState>(url).subscribe(
      (result) => {
        this.gameState = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createGameByName() {
    console.log("Start Create Game Call");
    this.gameService.postGameByName(this.userEnteredGameName).subscribe({
      next: (response) => {
        console.log('POST Success! ', response);
        this.game = response;
      },
      error: (err) => console.error('POST failed', err)
    });
  };

  createGame() {
    console.log("Start Create Game Call");
    this.gameService.postGame(this.dominoOne).subscribe({
      next: (response) => {
        console.log('POST Success! ', response);
      },
      error: (err) => console.error('POST failed', err)
    });
  };

  title = 'angularapp1.client';
}
