import { Yardages } from './yardages';
import { Hole } from './hole';

export interface Course {
  id: number;
  name: string;
  tees: {
    [key: string]: {
      yardages: Yardages,
      frontNine: Hole[],
      backNine: Hole[]
    }
  };
}
