import { BetterBallRound } from './better-ball-round';

export interface TwoManBetterBall {
  week: number;
  courseId: string;
  TeamNetTotal: number;
  TeamGrossTotal: number;
  APlayerRound: BetterBallRound;
  BPlayerRound: BetterBallRound;
}
