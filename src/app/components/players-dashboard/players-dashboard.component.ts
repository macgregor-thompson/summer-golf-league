import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { MockDataService } from '../../services/mock-data.service';
import { Golfer } from '../../models/golfer';
import { Round } from '../../models/round';
import { HandicapDialogModalComponent } from '../handicap-dialog-modal/handicap-dialog-modal.component';


@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  spinner = false;
  golfers: Golfer[];
  rounds: Round[];
  step = -1;
  result;
  averages = {};

  constructor(private mockDataService: MockDataService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getGolfers();
    this.getAllScores();
  }

  getGolfers() {
    this.spinner = true;
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => {
        this.golfers = data;
        this.spinner = false;
      }, () => this.spinner = false);
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
    const handicapModalRef = this.dialog.open(HandicapDialogModalComponent, {
      width: '800px',
      data: this.golfers
    });

    handicapModalRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      this.result = result;
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
