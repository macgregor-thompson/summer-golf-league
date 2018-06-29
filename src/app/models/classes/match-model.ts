import { Match } from '../interfaces/match';

export class MatchModel implements Match {
  foo: string;
  week: number;
  number: number;
  format: number;
  courseId: string;
  teamOne: {
    playerA: string;
    playerB: string;
    teamId: number;
  };
  teamTwo: {
    playerA: string;
    playerB: string;
    teamId: number;
  };
  teamOneRoundId: string;
  teamTwoRoundId: string;
  lowManStokes: number;

  constructor(foo: string) {
    this.foo = foo;
  }
}
