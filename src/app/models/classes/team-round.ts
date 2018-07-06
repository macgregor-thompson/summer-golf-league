import { Round } from './round';
import { Scores } from './scores';
import { ITeamRound } from '../interfaces/i-team-round';

export class TeamRound implements ITeamRound {
  teamId = 0;
  netTotal = 0;
  roundA: Round;
  roundB?: Round;
  netScores: Scores;

  constructor(TwoManBetterBall: boolean) {
    this.netScores = new Scores();
    if (TwoManBetterBall) {
      this.roundA = new Round(true);
      this.roundB = new Round(true);
    } else {
      this.roundA = new Round(false);
    }
  }

}
