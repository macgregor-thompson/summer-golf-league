import { Yardages } from './yardages';
import { Par } from './par';

export interface Hole {
  number: number;
  par: number;
  yardage: number;
  handicap: number;
}
