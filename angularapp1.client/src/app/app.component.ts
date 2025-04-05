import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { Domino } from '../classes/Domino';
import { Hand } from '../classes/Domino';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGameState();
    this.createGame();
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
        this.hand = dominoesJson;
        console.log(this.hand.dOne.sideA + this.hand.dOne.sideB);

        let playerOneHand = JSON.parse(this.gameState.domino);
        this.hand.dOne.sideA = playerOneHand.d_one.side_a;
        console.log(this.hand.dOne.sideA);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  createGame() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        //'Access-Control-Allow-Origin': '*'
      })
    };
    console.log("Here");
    let test = JSON.stringify(this.hand);
    console.log("test: " + test);
    let url: string = isDevMode() ? '/create_game' : 'https://www.thedummystoretest.site/create_game';
    console.log("url: " + url);

    this.http.post(url, test, httpOptions).subscribe(
      (result) => {
        console.log("Success");
      },
      (error) => {
        console.error(error);
      }
    )
  };

  title = 'angularapp1.client';
}
