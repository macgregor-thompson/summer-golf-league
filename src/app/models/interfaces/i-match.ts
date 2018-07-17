import { Format } from '../enums/format.enum';
import { ICourse } from './i-course';
import { ITeamRound } from './i-team-round';


export interface IMatch {
  week: number;
  format: Format;
  winner?: number; // 0 = tie, 1 = teamOne, 2 = teamTwo........ignored on team scramble
  course: ICourse;
  teamOne: ITeamRound;
  teamTwo: ITeamRound;
  teamThree?: ITeamRound;
}
