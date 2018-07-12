import { Round } from './round';
import { Scores } from './scores';
import { ITeamRound } from '../interfaces/i-team-round';

export class TeamRound implements ITeamRound {
  teamId = 0;
  netTotal = 0;
  matchTotal = 0;
  roundA: Round;
  roundB?: Round;
  netScores: Scores;
  matchScores: Scores;


  constructor(TwoManBetterBall: boolean) {
    this.netScores = new Scores();
    this.matchScores = new Scores();
    if (TwoManBetterBall) {
      this.roundA = new Round(true);
      this.roundB = new Round(true);
    } else {
      this.roundA = new Round(false);
    }
  }

}
