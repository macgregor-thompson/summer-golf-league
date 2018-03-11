import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { Round } from '../../models/round';
import { SidePlayed } from '../../models/enums/side-played.enum';
import { Score } from '../../models/score';


@Component({
  selector: 'app-score-view',
  templateUrl: './score-view.component.html',
  styleUrls: ['./score-view.component.scss']
})
export class ScoreViewComponent implements OnInit, OnChanges {
  @Input() round: Round;

  constructor() { }

  ngOnInit() {
    console.log('round:', this.round);
  }

  ngOnChanges(changes) {
    console.log('something changed:', changes);
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
