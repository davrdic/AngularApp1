export interface Domino {
  shortId: string;
  highValue: number;
  lowValue: number;
  doublet: boolean;
}

export type Hand = Domino[];
export type Hands = Hand[]; // One hand per player

export interface ScoreCard {
  teamScores: number[]; // [team1Score, team2Score]
}

export enum GameStatus {
  WAITING = 'waiting',
  BIDDING = 'bidding',
  PLAYING = 'playing',
  COMPLETE = 'complete'
}

export interface Game {
  game_id: string;
  game_name: string;
  game_status: GameStatus;
  current_round_id: string;
  round_number: number;
  current_player_id: number;
  arena: Domino[];            // arena.slots[0] = player one’s domino
  turn_order: number[];
  hands: Domino[][];      // e.g. [ [d1, d2, ...], [d1, d2, ...] ]
  game_complete: boolean;
  score: number[];
  dealer: number;
  roundLeader: number;
  spade: number;
  highestBid: number;
  winningBid: number;
  playerTurn: number;      // index of player whose turn it is
}

export const initialGameState: Game = {
  game_id: '',
  game_name: '',
  game_status: GameStatus.WAITING,
  current_round_id: '',
  round_number: -1,
  current_player_id: -1,
  arena: [],
  turn_order: [],
  hands: [],
  game_complete: false,
  score: [-1, -1],
  dealer: -1,
  highestBid: -1,
  winningBid: -1,
  roundLeader: -1,
  spade: -1,
  playerTurn: -1
};
