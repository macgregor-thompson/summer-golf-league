import { SidePlayed } from './enums/side-played.enum';
import { Score } from './score';

export interface Round {
  id: number;
  golferId: number;
  date: string;
  week: number;
  courseId: number;
  tees: string;
  sidePlayed: SidePlayed;
  total: number;
  par: number;
  handicap: number; // remember this value will change every few weeks...
  scores: Score[];
}
