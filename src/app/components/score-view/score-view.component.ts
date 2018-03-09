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
  SidePlayed = SidePlayed;
  //dataSource: MatTableDataSource<Round>;
  displayedColumns: string[];

  constructor() { }

  ngOnInit() {
    console.log('round:', this.round);
    //this.setData();
  }

  ngOnChanges(changes) {
    console.log('something changed:', changes);
    //this.setData();
  }

 /* setData() {
    if (this.round.sidePlayed === this.SidePlayed.Front) {
      this.displayedColumns = ['hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'total'];
    } else {
      this.displayedColumns = ['hole', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'total'];
    }
    this.dataSource = new MatTableDataSource([this.round]);
  }*/

  scoreClass(score: Score) {
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


}
