import { Team } from './team';
import {Handicap} from './handicap';
import { Match } from './match';

export interface Golfer {
  id: string;
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
  points: number;
  leagueMember: boolean;
  rank?: number;
}
