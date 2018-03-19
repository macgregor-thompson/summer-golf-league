import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { Round } from '../../models/interfaces/round';
import { Score } from '../../models/interfaces/score';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss']
})
export class ScorecardComponent implements OnInit, OnChanges {
  @Input() round: Round;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
  }

  grossScoreClass(score: Score) {
    if (score.score === score.par) {
      return 'par';
    } else if (score.score === score.par + 1) {
      return 'bogie';
    } else if (score.score === score.par + 2) {
      return 'double-bogie';
    }  else if (score.score > score.par + 2) {
      return 'other';
    } else if (score.score === score.par - 1) {
      return 'birdie';
    } else if (score.score === score.par - 2) {
      return 'eagle';
    } else {
      return 'unknown';
    }
  }

  netScoreClass(score: Score) {
    const netScore = score.handicap <= this.round.courseHandicap * 2 ? score.score - 1 : score.score;
    if (netScore === score.par) {
      return 'par';
    } else if (netScore === score.par + 1) {
      return 'bogie';
    } else if (netScore === score.par + 2) {
      return 'double-bogie';
    }  else if (netScore > score.par + 2) {
      return 'other';
    } else if (netScore === score.par - 1) {
      return 'birdie';
    } else if (netScore === score.par - 2) {
      return 'eagle';
    } else {
      return 'unknown';
    }
  }

}
