import { LeagueStatus } from './enums/league-status.enum';
import { Round } from './round';
import { Team } from './team';
import {Handicap} from './handicap';

export interface Golfer {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  ghinNumber: number;
  email: string;
  team: Team;
  leagueStatus: LeagueStatus; // Member = 1, Substitute = 2
  handicap: number;
  handicaps: Handicap[];
  scores: Round[];
}
