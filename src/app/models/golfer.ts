import { LeagueStatus } from './enums/league-status.enum';
import { Round } from './round';
import { Team } from './team';

export interface Golfer {
  id: number;
  firstName: string;
  lastName: string;
  nickname?: string;
  email: string;
  team: Team;
  leagueStatus: LeagueStatus;
  handicap: number;
  scores: Round[];
}
