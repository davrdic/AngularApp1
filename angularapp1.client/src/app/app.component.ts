import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { isDevMode } from '@angular/core';
interface GameState {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public gameStates: GameState[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getGameState();
  }

  getGameState() {
    let url: string = isDevMode() ? '/game_state' : 'https://www.thedummystoretest.site/game_state';
    this.http.get<GameState[]>(url).subscribe(
      (result) => {
        this.gameStates = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'angularapp1.client';
}
