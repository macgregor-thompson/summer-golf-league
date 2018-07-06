import { Course } from './course';
import { Format } from '../enums/format.enum';
import { TeamRound } from './team-round';
import { IMatch } from '../interfaces/i-match';

export class Match implements IMatch {
  week: number;
  format: Format;
  course: Course;
  teamOne: TeamRound;
  teamTwo: TeamRound;


  constructor(week: number, format: Format, frontNine: boolean) {
    this.week = week;
    this.format = format;
    this.course = new Course(frontNine);
    this.teamOne = new TeamRound(format === Format.TwoManBetterBall);
    this.teamTwo = new TeamRound(format === Format.TwoManBetterBall);
  }
}
