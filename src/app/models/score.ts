import { HolesPlayed } from './holes-played.enum';

export interface Score {
  id: number;
  golferId: number;
  date: string;
  courseId: number;
  tees: string;
  holesPlayed: HolesPlayed;
  total: number;
  frontNine: {
    out: number,
    1: number,
    2: number,
    3: number,
    4: number,
    5: number,
    6: number,
    7: number,
    8: number,
    9: number
  } | null;
  backNine: {
    in: number,
    10: number,
    11: number,
    12: number,
    13: number,
    14: number,
    15: number,
    16: number,
    17: number,
    18: number
  } | null;
}
