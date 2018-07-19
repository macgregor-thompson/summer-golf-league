import {Handicap} from './handicap';

export interface IGolfer {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  handicap: number;
  teamId: number;
  points?: number;
  netPoints?: number;
  rank?: number | string; // this gets generated on he front end
  paid?: boolean;

  // Optional
  ghinNumber?: number;
  email?: string;
  handicaps?: Handicap[];
}
