import {Handicap} from './handicap';
import { IPoints } from './i-points';

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
  weeklyPoints?: object;

  // Optional
  ghinNumber?: number;
  email?: string;
  handicaps?: Handicap[];
}
