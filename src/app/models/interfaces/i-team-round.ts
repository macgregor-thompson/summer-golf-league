import { IScores } from './i-scores';
import { IRound } from './i-round';

export class ITeamRound {
  teamId: number;
  roundA: IRound;
  roundB?: IRound;
  netScores: IScores;
  netTotal: number;
}
