import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Domino } from '../classes/Domino';
import { initialGameState } from '../classes/Domino';
import { GameService } from './GameService';

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
  filteredList: string[] = [];
  showSuggestions: boolean = false;
  bid: number | null = null;


  createGameClick() {
    console.log('userEnteredGameName: ', this.userEnteredGameName);
    this.createGameByName();
    this.userEnteredGameName = '';
    this.gameToLoad = '';
    this.searchQuery = '';
  }

  loadGame() {
    console.log('gameToLoad: ', this.searchQuery);
    this.findGameByName(this.searchQuery);
    this.userEnteredGameName = '';
    this.gameToLoad = '';
    this.searchQuery = '';
  }

  onInputClick() {
    if (this.showSuggestions) {
      this.showSuggestions = false;
    }
    if (this.filteredList.length === 0) {
      console.log("finding...");
      this.findAllGameNames();
    }
    this.showSuggestions = true;
  }

  //onInputChange(event: any) {
  //  const value = event.target.value;
  //  console.log("Typing:", value);
  //  // Filter the list of games, or call a search API
  //}

  selectSuggestion(event: any) {
    const value = event.target.innerText;
    this.searchQuery = value;
    this.findGameByName(this.searchQuery);
    this.userEnteredGameName = '';
    this.gameToLoad = '';
    this.searchQuery = '';  }

  hideSuggestions() {
    console.log("hideSuggestions");
    this.showSuggestions = false;
  }

  filterSuggestions() {
    console.log("filterSuggestions pressed");
  }

  handleEnter() {
    console.log("handleEnter pressed");
    this.loadGame();
  }

  onInputEnter() {
    console.log("onInputEnter pressed");
    this.loadGame();
  }

  selectGame(gameName: string) {
    console.log("selectGame");
  }

  placeBidClick() {
    console.log("placeBidClick", this.bid);
  }

  playDominoClick(index: number) {
    console.log("playDominoClick :", index);
    //this.game.playerHands[0].splice(index, 1);
  }

  public game = initialGameState;

  private dominoOne = {
    side_a: 0,
    side_b: 0
  };

  constructor(private http: HttpClient, private gameService: GameService) { }

  ngOnInit() {
  }

  //Creates a new game by name
  createGameByName() {
    console.log("Start Create Game Call");
    this.gameService.postGameByName(this.userEnteredGameName).subscribe({
      next: (response) => {
        console.log('POST Success! ', response);
        this.game = response;
        console.log('this.game: ', this.game);
      },
      error: (err) => console.error('POST failed', err)
    });
  };

  //Finds a game by name
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

  //Finds all available game names
  findAllGameNames() {
    this.gameService.findAllGameNames().subscribe({
      next: (response) => {
        console.log('FindAllGameNames success: ', response);
        this.filteredList = response;
      },
      error: (err) => {
        console.error('FindAllGameNames failed: ', err);
        this.filteredList = [];
      }
    })
  }

  //deleteGameData(gameId: string) {
  //  this.gameService.deleteGame(gameId).subscribe({
  //    next: (response) => {
  //      console.log('deleteGameData ', gameId, ' success: ', this.game)
  //      this.game = response;
  //    },
  //    error: (err) => console.error('deleteGameData failed: ', err)
  //  }
  //  );
  //}



  //updateData() {
  //  this.gameService.updateGame('abc123', {
  //    player: 'Player 1',
  //    score: 99
  //  }).subscribe({
  //    next: (response) => console.log('PUT Success!', response),
  //    error: (err) => console.error('Update failed', err)
  //  });
  //}

  title = 'angularapp1.client';
}
