export class Domino {
  private _sideA: number;
  private _sideB: number;

  constructor(sideA: number, sideB: number) {
    this._sideA = sideA;
    this._sideB = sideB;
  }
  public set sideA(sideA: number) {
    this._sideA = sideA;
  }

  public set sideB(sideB: number) {
    this._sideB = sideB;
  }

  public get sideA() {
    return this._sideA;
  }

  public get sideB() {
     return this._sideB;
  }
}
const domino = new Domino(0, 0);
export class Hand {
  dOne: Domino;
  dTwo: Domino;

  constructor(dOne: Domino = domino, dTwo: Domino = domino) {
    this.dOne = dOne;
    this.dTwo = dTwo
  }
}
