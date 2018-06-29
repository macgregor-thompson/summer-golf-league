import { Team } from './team';

export interface BetterBallRound {
  golferId: number;
  week: number;
  total: number;
  handicap: number;
  strokesGetting: number;
  team: Team;
  scores: number[];
}
