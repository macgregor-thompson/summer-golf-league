import { IWeek } from '../interfaces/i-week';

export class Week implements IWeek {
  number: number;
  date: string;
  completed?: boolean;
  frontNine?: boolean;
  courseId?: string;
  //front - IUbblBLeAMLOit5hfaVM
  // back - KVGfWzdfjgK1n3Pqqs5L

  constructor() {
    this.number = 1;
    this.date = new Date().toLocaleDateString();
    this.completed = true;
    this.frontNine = true;
    this.courseId = 'IUbblBLeAMLOit5hfaVM';
  }
}
