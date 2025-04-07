import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Domino } from '../classes/Domino';
import { Hand } from '../classes/Domino';
import { GameService } from './GameService';

interface GameState {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
  domino: string;
}

interface GameStateJsons {
  domino: JSON
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  //public gameStates: GameState[] = [];

  public gameState: GameState = {
    date: '',
    temperatureC: 0,
    temperatureF: 0,
    summary: '',
    domino: ''
  }



  //public domino = new Domino(0, 0);
  public hand = new Hand();

  //public hand: Hand = {
  //  dOne: { sideA: 0 , sideB: 0},
  //  dTwo: { sideA: 0, sideB: 0}
  //}

  constructor(private http: HttpClient, private gameService: GameService) {}
  gameData: any;
  id: any;
  ngOnInit() {
    //this.getGameState();
    let id = this.createGame();
    console.log("Test B: " + id);
  }

  newGet(gameId: string) {
    this.gameService.getGame(gameId).subscribe(
      data => {
        console.log('Game data received:', data);
        this.gameData = data;  // Store the response data
      },
      error => {
        console.error('Error fetching game data:', error);
      }
    );
  }

  getGameState() {
    let url: string = isDevMode() ? '/game_state' : 'https://www.thedummystoretest.site/game_state';
    this.http.get<GameState>(url).subscribe(
      (result) => {
        //let domino = new Domino(0, 0);
        this.gameState = result;
        let dominoesJson = JSON.parse(this.gameState.domino);
        this.hand.dOne.sideA = dominoesJson.d_one.side_a;
        this.hand.dOne.sideB = dominoesJson.d_two.side_a;
        //this.hand = dominoesJson;
        //console.log(this.hand.dOne.sideA + this.hand.dOne.sideB);

        let playerOneHand = JSON.parse(this.gameState.domino);
        //this.hand.dOne.sideA = playerOneHand.d_one.side_a;
        //console.log(this.hand.dOne.sideA);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createGame(): string {
    const httpOptions = {
      headers: new HttpHeaders({
        //'Content-Type': 'application/json'
        //'Access-Control-Allow-Origin': '*'
      })
    };
    console.log("Here");

    const dominoOne = {
      side_a: 0,
      side_b: 0
    };

    const dominoTwo = {
      side_a: 1,
      side_b: 1
    };

    const dominoThree = {
      side_a: 1,
      side_b: 1
    };

    const hand = {
      domino_one: dominoOne,
      domino_two: dominoTwo,
      domino_three: dominoThree
    }

    //console.log("test: " + test);
    let url: string = isDevMode() ? '/create_game' : 'https://www.thedummystoretest.site/create_game';
    console.log("url: " + url);

    //this.http.post(url, JSON.stringify({ key1: 'value1', key2: 'value2' }), httpOptions).subscribe(
    let myString: string = '{"d_one":{"side_a": 1, "side_b":1},"d_two":{"side_a": 2,"side_b": 2}}';
    this.http.post(url, dominoOne, httpOptions).subscribe(
      (result) => {
        let testvalue = this.newGet(JSON.stringify(result));
        console.log("testvalue: " + result);
      },
      (error) => {
        console.error(error);
        return 'fail';
      }
    )
    return 'hello';
  };

  title = 'angularapp1.client';
}
