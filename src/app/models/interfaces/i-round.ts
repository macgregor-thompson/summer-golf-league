import { IGolfer } from './i-golfer';
import { IScores } from './i-scores';

export interface IRound {
  playerA: IGolfer;
  playerB?: IGolfer;
  playerC?: IGolfer;
  playerD?: IGolfer;
  week: number;
  total: number;
  netTotal: number;
  handicap: number;
  strokesGetting: number;
  matchStrokes: number;
  teamId: number;
  scores: IScores;
  netScores: IScores;

  // Just to quieten all the things barking at me
  golferId?: string;

  //format: Format;
  //course: ICourse;
}

