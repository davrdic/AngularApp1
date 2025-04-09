export interface Domino {
  sideA: number;
  sideB: number;
}

export type Hand = Domino[];

export type Hands = Hand[]; // One hand per player

export interface Arena {
  slots: (Domino | null)[]; // Index 0 = Player One, 1 = Player Two, etc.
}

export interface ScoreCard {
  teamScores: number[]; // [team1Score, team2Score]
}

export interface Game {
  id: number;
  name: string;
  playerHands: Hands;      // e.g. [ [d1, d2, ...], [d1, d2, ...] ]
  arena: Arena;            // arena.slots[0] = player one’s domino
  scoreCard: ScoreCard;
  playerTurn: number;      // index of player whose turn it is
}

export const initialGameState: Game = {
  id: 0,
  name: '',
  playerHands: [],
  arena: {
    slots: [null, null, null, null] // Each player's played domino
  },
  scoreCard: {
    teamScores: [0, 0] // Team 1 (players 1 & 3), Team 2 (players 2 & 4)
  },
  playerTurn: 0 // Player 1 starts
};
