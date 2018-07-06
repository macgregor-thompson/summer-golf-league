import { ICourse } from '../interfaces/i-course';
import { Hole } from '../interfaces/hole';

export class Course implements ICourse {
  id: string;
  name: string;
  frontNine: boolean;
  slope: number;
  par: number;
  yardage: number;
  holes: Hole[];

  constructor(front?: boolean) {
    if (front) {
      this.id = 'IUbblBLeAMLOit5hfaVM';
      this.name = 'Front 9 - Breakfast Hill';
      this.frontNine = true;
      this.par = 36;
      this.slope = 129;
      this.yardage = 3116;
      this.holes = [
        {handicap: 12, number: 1, par: 4, stroke: 6, yardage: 335},
        {handicap: 10, number: 2, par: 5, stroke: 5, yardage: 490},
        {handicap: 4, number: 3, par: 4, stroke: 2, yardage: 362},
        {handicap: 18, number: 4, par: 3, stroke: 9, yardage: 179},
        {handicap: 8, number: 5, par: 5, stroke: 4, yardage: 525},
        {handicap: 16, number: 6, par: 3, stroke: 8, yardage: 126},
        {handicap: 2, number: 7, par: 4, stroke: 1, yardage: 408},
        {handicap: 6, number: 8, par: 4, stroke: 3, yardage: 328},
        {handicap: 14, number: 9, par: 4, stroke: 7, yardage: 363}
      ];
    } else {
      this.id = 'KVGfWzdfjgK1n3Pqqs5L';
      this.name = 'Back 9 - Breakfast Hill';
      this.frontNine = false;
      this.par = 35;
      this.slope = 126;
      this.yardage = 3042;
      this.holes = [
        {handicap: 7, number: 10, par: 4, stroke: 4, yardage: 302},
        {handicap: 1, number: 11, par: 4, stroke: 1, yardage: 473},
        {handicap: 5, number: 12, par: 5, stroke: 3, yardage: 526},
        {handicap: 15, number: 13, par: 4, stroke: 8, yardage: 311},
        {handicap: 11, number: 14, par: 3, stroke: 6, yardage: 165},
        {handicap: 13, number: 15, par: 4, stroke: 7, yardage: 359},
        {handicap: 9, number: 16, par: 4, stroke: 5, yardage: 364},
        {handicap: 17, number: 17, par: 3, stroke: 9, yardage: 158},
        {handicap: 3, number: 18, par: 4, stroke: 2, yardage: 384}
      ];
    }
  }

}
