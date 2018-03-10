import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


import { MockDataService } from '../../services/mock-data.service';
import { Round } from '../../models/round';
import { Golfer } from '../../models/golfer';



@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: [ './scores.component.scss' ]
})
export class ScoresComponent implements OnInit {
  rounds: Round[];
  golfers: Observable<any>;

  constructor(private mockDataService: MockDataService,
              db: AngularFirestore) {
    this.golfers = db.collection('golfers').valueChanges();

  }

  ngOnInit() {
    this.getAllScores();
  }

  getAllScores() {
    return this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => this.rounds = data);
  }
}
