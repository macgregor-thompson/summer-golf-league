import { Format } from '../enums/format.enum';

export interface Match {
  week: number;
  number: number;
  format: Format;
  courseId: string;
  //FrontNine: 'IUbblBLeAMLOit5hfaVM';
  //BackNine: 'KVGfWzdfjgK1n3Pqqs5L';
  teamOne: MatchTeam;
  teamTwo: MatchTeam;
  teamOneRoundId: string;
  teamTwoRoundId: string;
  lowManStokes: number;
}

export interface MatchTeam {
  playerA: string;
  playerB: string;
  teamId: number;
}
