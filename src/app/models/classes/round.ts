import { IScores } from '../interfaces/i-scores';
import { IGolfer } from '../interfaces/i-golfer';
import { Scores } from './scores';
import { Player } from './player';
import { Format } from '../enums/format.enum';

export class Round {
  playerA: IGolfer;
  playerB?: IGolfer;
  playerC?: IGolfer;
  playerD?: IGolfer;
  week = 1;
  total = 0;
  netTotal = 0;
  handicap = 0;
  strokesGetting = 0;
  matchStrokes = 0;
  teamId = 0;
  scores: IScores;
  netScores: IScores;

  constructor(format: Format) {
    this.scores = new Scores();
    this.netScores = new Scores();
    this.playerA = new Player();
    if (format === Format.TwoManBetterBall) {
      this.playerB = new Player();
    } else if (format === Format.FourManScramble) {
      this.playerB = new Player();
      this.playerC = new Player();
      this.playerD = new Player();
    }
  }
}
