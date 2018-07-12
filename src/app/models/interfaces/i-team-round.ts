import { IScores } from './i-scores';
import { IRound } from './i-round';
import { Team } from './team';

export class ITeamRound {
  teamId: number;
  team: Team;
  roundA: IRound;
  roundB?: IRound;
  netScores: IScores;
  netTotal: number;
  matchScores?: IScores;
  matchTotal: number;
}
