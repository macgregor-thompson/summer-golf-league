import { LeagueStatus } from './enums/league-status.enum';
import { Round } from './round';
import { Team } from './team';
import {Handicap} from './handicap';
import { Match } from './match';

export interface Golfer {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  ghinNumber: number | null;
  email: string;
  team: Team | null;
  handicap: number;
  handicaps: Handicap[] | null;
  matches: Match[];
  teamId: number;
}

export class Player implements Golfer {
  id: number;
  firstName: string;
  lastName: string;
  displayName: string;
  ghinNumber: number | null;
  email: string;
  team: Team | null;
  teamId: number;
  handicap: number;
  handicaps: Handicap[] | null;
  matches: Match[] | null;
}
