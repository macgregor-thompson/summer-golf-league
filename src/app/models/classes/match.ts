import { Course } from './course';
import { Format } from '../enums/format.enum';
import { TeamRound } from './team-round';
import { IMatch } from '../interfaces/i-match';

export class Match implements IMatch {
  id: string;
  week: number;
  format: Format;
  course: Course;
  teamOne: TeamRound;
  teamTwo: TeamRound;
  teamThree?: TeamRound;
  picture?: string;

  constructor(week: number, format: Format, frontNine: boolean, id) {
    this.id = id;
    this.week = week;
    this.format = format;
    this.course = new Course(frontNine);
    this.teamOne = new TeamRound(format);
    this.teamTwo = new TeamRound(format);
    if (format === Format.FourManScramble) {
      this.teamThree = new TeamRound(format);
    }
    this.picture = '';
  }
}
