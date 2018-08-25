import {Handicap} from './handicap';
import { IPoints } from './i-points';
import { Team } from './team';

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
  worstWeek?: number; // week number that was the worst week
  worstWeekPoints?: number;
  secondWorstWeek?: number;
  secondWorstWeekPoints?: number;
  team?: Team;
  winnings?: number;
  // Optional
  ghinNumber?: number;
  email?: string;
  handicaps?: Handicap[];
}
