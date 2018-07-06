import { Format } from '../enums/format.enum';
import { ICourse } from './i-course';
import { ITeamRound } from './i-team-round';


export interface IMatch {
  week: number;
  format: Format;
  course: ICourse;
  teamOne: ITeamRound;
  teamTwo: ITeamRound;
}
