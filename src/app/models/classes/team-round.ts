import { Round } from './round';
import { Scores } from './scores';
import { ITeamRound } from '../interfaces/i-team-round';
import { Team } from '../interfaces/team';
import { Format } from '../enums/format.enum';

export class TeamRound implements ITeamRound {
  teamId = 0;
  netTotal = 0;
  matchTotal = 0;
  roundA: Round;
  roundB?: Round;
  netScores: Scores;
  matchScores: Scores;
  team: Team;

  constructor(format: Format) {
    this.netScores = new Scores();
    this.matchScores = new Scores();
    if (format === Format.TwoManBetterBall) {
      this.roundA = new Round(format);
      this.roundB = new Round(format);
    } else {
      this.roundA = new Round(format);
    }
  }

}
