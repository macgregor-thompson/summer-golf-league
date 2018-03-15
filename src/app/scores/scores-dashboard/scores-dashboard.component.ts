import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { MockDataService } from '../../core/services/mock-data.service';
import { Round } from '../../models/round';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {
  rounds: Round[];
  golfers: Observable<any>;

  constructor(private mockDataService: MockDataService,
              private afs: AngularFirestore) {

  }

  ngOnInit() {
    console.log('initting scores dash');
    this.golfers = this.afs.collection('golfers').valueChanges();
    this.getAllScores();
  }

  getAllScores() {
    return this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => this.rounds = data);
  }
}
