import { Team } from './team';
import { Golfer } from './golfer';

export interface Match {
  week: number;
  teamOne: Team;
  teamTwo: Team;
  players: Golfer[];
}
