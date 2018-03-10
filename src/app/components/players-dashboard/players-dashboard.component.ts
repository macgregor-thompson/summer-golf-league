import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';
import { MatDialog } from '@angular/material';
import { Golfer } from '../../models/golfer';
import { Round } from '../../models/round';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  spinner = false;
  golfers: Golfer[];
  step = 0;
  averages = {};

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getGolfers();
  }

  getGolfers() {
    this.spinner = true;
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => {
        this.golfers = data;
        this.spinner = false;
      }, () => this.spinner = false);
  }

  setAverage(avg: number, golfer: Golfer) {
    this.averages[golfer.id] = avg;
  }

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
