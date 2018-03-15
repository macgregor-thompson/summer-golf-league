import { LeagueStatus } from './enums/league-status.enum';
import { Round } from './round';
import { Team } from './team';
import {Handicap} from './handicap';

export interface Golfer {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  ghinNumber: number | null;
  email: string;
  team: Team | null;
  leagueStatus: LeagueStatus; // Member = 1, Substitute = 2
  handicap: number;
  handicaps: Handicap[] | null;
  scores: Round[] | null;
}

export class Player {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  ghinNumber: number | null;
  email: string;
  team: Team | null;
  leagueStatus: LeagueStatus; // Member = 1, Substitute = 2
  handicap: number;
  handicaps: Handicap[] | null;
  scores: Round[] | null;
}
