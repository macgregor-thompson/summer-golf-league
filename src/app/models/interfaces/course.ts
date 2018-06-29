import { Hole } from './hole';

export interface Course {
  id: string;
  name: string;
  slope: number;
  par: number;
  yardage: number;
  holes: Hole[];
}
