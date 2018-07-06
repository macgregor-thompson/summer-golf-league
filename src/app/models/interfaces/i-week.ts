import { Format } from '../enums/format.enum';

export interface IWeek {
  number: number;
  date: string;
  completed?: boolean;
  frontNine?: boolean;
  courseId?: string;
  format?: Format;
}
