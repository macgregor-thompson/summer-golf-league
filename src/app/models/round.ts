import { SidePlayed } from './enums/side-played.enum';
import { Score } from './score';
import { Team } from './team';
import {Format} from './enums/format.enum';

export interface Round {
  id: number;
  individual: boolean;
  golfers: number[];
  // TODO: refactor to just use the golfers array or do we just check if individual round or not and then check the array
  golferId: number;
  date: string;
  week: number;
  courseId: number;
  tees: string;
  sidePlayed: SidePlayed;
  total: number;
  par: number;
  handicap: number; // remember this value will change every few weeks...
  courseHandicap: number; // value will change so we need to have a handicap "tagged" with a round
  calculatedCourseHandicap: number; // what will be used to compare rounds
  format: Format;
  team: Team; // focus on this instead of the team associated with the person
  scores: Score[];
}
