import { Component, Input, OnInit } from '@angular/core';
import { IMatch } from '../../models/interfaces/i-match';
import { Team } from '../../models/interfaces/team';
import { Format } from '../../models/enums/format.enum';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit {
  @Input() match: IMatch;
  @Input() individualScores: boolean;
  Format = Format;
  teams: Team[];
  matchStrokesDifferent = false;
  teamAIndividual = false;
  teamBIndividual = false;
  outcome =  {
    tie: false,
    score: '',
    team: {},
    playerA: {},
    playerB: {}
  };

  constructor() {}

  ngOnInit() {
    this.matchStrokesDifferent = this.match.teamOne.roundA.matchStrokes !== this.match.teamOne.roundA.strokesGetting;
    this.determineMatch();
  }



  numStrokes(strokes, i) {
    if (strokes > 0) {
      if (strokes > 9) {
        let unFuckingBelievable = strokes - 9;
        return unFuckingBelievable >= this.match.course.holes[i].stroke ? [1, 2] : [1];
      } else {
        return strokes >= this.match.course.holes[i].stroke ? [1] : [];
      }
    }
  }

  toggleTeamA() {
    this.teamAIndividual = !this.teamAIndividual;
  }

  toggleTeamB() {
    this.teamBIndividual = !this.teamBIndividual;
  }


  addNetScore(team, hole, event) {
    let score = parseInt(event.target.value, 10);
    this.match[team].netScores[hole] = score;
    this.match[team].netTotal = Object.values(this.match[team].netScores).reduce((a, b) => a + b);
    if (this.match[team].roundA.matchStrokes === this.match[team].roundA.strokesGetting) {
      this._addMatchScore(team, hole, score);
    }
  }

  _addMatchScore(team, hole, score) {
    this.match[team].matchScores[hole] = score;
    this.match[team].matchTotal = Object.values(this.match[team].matchScores).reduce((a, b) => a + b);
  }

  addMatchScore(team, hole, event) {
    this.match[team].matchScores[hole] = parseInt(event.target.value, 10);
    this.match[team].matchTotal = Object.values(this.match[team].matchScores).reduce((a, b) => a + b);
  }

  determineMatch() {
    let a = 0, b = 0, holesLeft = 9;
    for (let i = 1; i <= 9; i++) {
      let scoreA = this.match.teamOne.matchScores[i];
      let scoreB = this.match.teamTwo.matchScores[i];
      if (Math.abs(a - b) <= holesLeft) {
        holesLeft--;
        if (scoreA < scoreB) {
          a++;
        } else if (scoreA > scoreB) {
          b++;
        }
      }
    }
    if (a === b) {
      this.outcome.tie = true;
    } else if (a > b) {
      this.outcome.team = this.match.teamOne.team;
      this.outcome.playerA = this.match.teamOne.roundA.playerA.displayName;
      this.outcome.playerB = this.match.teamOne.roundB ? this.match.teamOne.roundB.playerA.displayName
        : this.match.teamOne.roundA.playerB.displayName;
      if (holesLeft === 0) {
        this.outcome.score = `win ${a - b} up`;
      } else {
        this.outcome.score = `win ${a - b} & ${holesLeft}`;
      }
    } else if (a < b) {
      this.outcome.team = this.match.teamTwo.team;
      this.outcome.playerA = this.match.teamTwo.roundA.playerA.displayName;
      this.outcome.playerB = this.match.teamTwo.roundB ? this.match.teamTwo.roundB.playerA.displayName
        : this.match.teamTwo.roundA.playerB.displayName;
      if (holesLeft === 0) {
        this.outcome.score = `win ${b - a} up`;
      } else {
        this.outcome.score = `win ${b - a} & ${holesLeft}`;
      }
    }
  }

  scoreClass(score: number, i) {
    const par = this.match.course.holes[i].par;
    if (score === par) {
      return 'par';
    } else if (score === par + 1) {
      return 'bogie';
    } else if (score === par + 2) {
      return 'double-bogie';
    } else if (score > par + 2) {
      return 'other';
    } else if (score === par - 1) {
      return 'birdie';
    } else if (score === par - 2) {
      return 'eagle';
    } else {
      return 'unknown';
    }
  }


}
