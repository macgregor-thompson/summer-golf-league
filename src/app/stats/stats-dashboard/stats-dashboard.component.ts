import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

import {MockDataService} from '../../core/services/mock-data.service';
import {Golfer} from '../../models/interfaces/golfer';
import {Round} from '../../models/interfaces/round';
import {UserService} from '../../core/services/user.service';


@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  golfers: Observable<Golfer[]>;
  currentGolfer: Golfer;
  rounds: Round[];
  spinner = false;
  step = -1;

  constructor(private afs: AngularFirestore,
              private userService: UserService,
              private mockDataService: MockDataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.golfersCollection = this.afs.collection<Golfer>('golfers');
    this.golfers = this.golfersCollection.valueChanges();
    this.getAllScores();
    console.log('this.golfersCollection:', this.golfersCollection);
    console.log('golfers:', this.golfers);
    this.getCurrentGolfer();
  }

  getAllScores() {
    this.spinner = true;
    this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => {
        this.rounds = data;
        this.spinner = false;
      }, () => this.spinner = false);
  }

  getCurrentGolfer() {
    this.userService.getCurrentGolfer().subscribe((data: Golfer) => this.currentGolfer = data);
  }

  filterRounds(golferId: number) {
    return this.rounds.filter((round: Round) => round.golferId === golferId);
  }

  calculateAverage(golferId: number) {
    let totals = 0;
    const rounds = this.filterRounds(golferId);
    rounds.forEach((round: Round) => {
      totals = totals + round.total;
    });
    return totals / rounds.length;
  }

  /* setAverage(avg: number, golfer: Golfer) {
     this.averages[golfer.id] = avg;
   }*/

  /* editPlayer(golfer: Golfer, event) {
     event.stopPropagation();
     console.log('editing handicap for: ', golfer.firstName);
   }*/

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
