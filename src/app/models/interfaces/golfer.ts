import {Handicap} from './handicap';

export interface Golfer {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  handicap: number;
  teamId: number;
  points: number;
  rank?: number | string; // this gets generated on he front end

  // Optional
  ghinNumber?: number;
  email?: string;
  handicaps?: Handicap[];
}
