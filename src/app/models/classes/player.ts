import { IGolfer } from '../interfaces/i-golfer';
import { IMatch } from '../interfaces/i-match';
import { Team } from '../interfaces/team';
import { Handicap } from '../interfaces/handicap';
import { IPoints } from '../interfaces/i-points';

export class Player implements IGolfer {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  handicap: number;
  teamId: number;
  points?: number;
  rank?: number | string; // this gets generated on he front end
  weeklyPoints?: object;

  constructor() {
    this.id = '';
    this.firstName = '';
    this.lastName = '';
    this.displayName = '';
    this.handicap = 0;
    this.teamId = 0;
    this.weeklyPoints = {};
  }
}
