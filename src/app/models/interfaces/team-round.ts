import { Format } from '../enums/format.enum';
import { BetterBallRound } from './better-ball/better-ball-round';

export interface TeamRound {
  id: string;
  week: number;
  teamId: number;
  format: Format;
  courseId: string;
  teamNetTotal: number;
  teamGrossTotal?: number;
  aPlayerRound?: BetterBallRound;
  bPlayerRound?: BetterBallRound;
  netScores?: number[];
  //combinedRound?:
}
