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
  searchQuery: string = '';
  filteredList: any[] = [];
  showSuggestions: boolean = false;


  createGameClick() {
    console.log('userEnteredGameName: ', this.userEnteredGameName);
    this.createGameByName();
    this.userEnteredGameName = '';
    this.gameToLoad = '';
    this.searchQuery = '';
  }

  loadGameClick() {
    console.log('gameToLoad: ', this.gameToLoad);
    this.findGameByName(this.gameToLoad);
    this.userEnteredGameName = '';
    this.gameToLoad = '';
    this.searchQuery = '';
  }

  onInputClick() {
    console.log("Test");
    this.showSuggestions = true;
    this.filteredList = ["game1", "game2"]
    //this.findAllGameNames()
  }

  onInputChange(event: any) {
    const value = event.target.value;
    console.log("Typing:", value);
    // Filter the list of games, or call a search API
  }

  selectSuggestion(event: any) {
    const value = event.target.value;
    console.log("Typing:", value);
    // Filter the list of games, or call a search API
  }

  hideSuggestions() {
    console.log("hideSuggestions");
  }

  filterSuggestions() {
    console.log("Enter pressed");
  }

  handleEnter() {
    console.log("Enter pressed");
  }

  onInputEnter() {
    console.log("Enter pressed");
  }

  selectGame(gameName: string) {
    console.log("selectGame");
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
    this.gameService.deleteGame(gameId).subscribe({
      next: (response) => {
        console.log('deleteGameData ', gameId, ' success: ', this.game)
        this.game = response;
      },
      error: (err) => console.error('deleteGameData failed: ', err)
    }
    );
  }

  findGameByName(gameName: string) {
    this.gameService.findGameByName(gameName).subscribe({
      next: (response) => {
        console.log('findGameByName ', gameName, ' success: ', this.game)
        this.game = response;
      },
      error: (err) => console.error('findGameByName failed: ', err)
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

  findAllGameNames() {
    this.gameService.findAllGameNames().subscribe({
      next: (response) => {
        console.log('FindAllGameNames success: ', response)
        this.filteredList = response;
      },
      error: (err) => console.error('FindAllGameNames failed: ', err)
    })
  }

  title = 'angularapp1.client';
}
