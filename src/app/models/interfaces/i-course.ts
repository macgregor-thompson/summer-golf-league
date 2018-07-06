import { Hole } from './hole';

export interface ICourse {
  id: string;
  name: string;
  frontNine: boolean;
  slope: number;
  par: number;
  yardage: number;
  holes: Hole[];
}
