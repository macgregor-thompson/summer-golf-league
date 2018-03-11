import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

import {MockDataService} from '../../services/mock-data.service';
import {Golfer} from '../../models/golfer';
import {Round} from '../../models/round';
import {HandicapDialogModalComponent} from '../handicap-dialog-modal/handicap-dialog-modal.component';
import { PlayerDialogModalComponent } from '../player-dialog-modal/player-dialog-modal.component';


@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  golfers: Observable<Golfer[]>;
  rounds: Round[];
  spinner = false;
  step = -1;
  result;

  constructor(private afs: AngularFirestore,
              private mockDataService: MockDataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.golfersCollection = this.afs.collection<Golfer>('golfers');
    this.golfers = this.golfersCollection.valueChanges();
    this.getAllScores();
    console.log('this.golfersCollection:', this.golfersCollection);
    console.log('golfers:', this.golfers);
  }

  getAllScores() {
    this.spinner = true;
    this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => {
        this.rounds = data;
        this.spinner = false;
      }, () => this.spinner = false);
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

  showHandicapModal() {
    const handicapModalRef = this.dialog.open(HandicapDialogModalComponent, {width: '800px'});
    handicapModalRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      this.result = result;
    });
  }

  showPlayerEditorModal() {
    const playerEditorDialogRef = this.dialog.open(PlayerDialogModalComponent, {width: '800px'});
    playerEditorDialogRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      //add player to firestore here
    });
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
