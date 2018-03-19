import { Golfer } from '../interfaces/golfer';
import { Match } from '../interfaces/match';
import { Team } from '../interfaces/team';
import { Handicap } from '../interfaces/handicap';

export class Player implements Golfer {
  id: string;
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
  points: number;
  leagueMember: boolean;
}
