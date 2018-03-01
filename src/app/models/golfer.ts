import { LeagueStatus } from './league-status.enum';
import { Score } from './score';

export interface Golfer {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  email: string;
  leagueStatus: LeagueStatus;
  handicap: number;
  scores: Score[];
}
