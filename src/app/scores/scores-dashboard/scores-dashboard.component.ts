import {Component, OnInit} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {MockDataService} from '../../core/services/mock-data.service';
import {Course} from '../../models/course';
import {Golfer} from '../../models/golfer';
import {Round} from '../../models/round';
import {Week} from '../../models/week';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {
  golfers: Observable<Golfer[]>;
  rounds: Round[];
  step = 0;
  weekSelected: Week;
  weeklyTotals = {};
  weeklyNet = [];
  weeks: Week[];
  spinner = false;
  icon = false;


  constructor(private afs: AngularFirestore,
              private mockDataService: MockDataService) {

  }


  ngOnInit() {
    this.getWeeks();
    this.getGolfers();
    this.getScoresByWeek(2);
  }

  toggleIndicator() {
    this.icon = !this.icon;
  }

  getWeeks() {
    this.mockDataService.getWeeks()
      .subscribe((data: Week[]) => {
        this.weeks = data;
        this.weekSelected = data.filter((week: Week) => week.number === data.length)[0];
        console.log('weekSelected:', this.weekSelected);
      });
  }

  addWeek() {

  }


  getGolfers() {
    this.golfers = this.afs.collection<Golfer>('golfers').valueChanges();
  }

  getScoresByWeek(weekNum: number) {
    this.spinner = true;
    this.mockDataService.getScoresByWeek(weekNum)
      .subscribe((data: Round[]) => {
        this.rounds = data;
        console.log('data2:', data);
        console.log(`Week ${weekNum} rounds: ${this.rounds}`);
        data.forEach((round: Round) => {
          this.weeklyTotals[round.golferId] = round.total;
          this.weeklyNet[round.golferId] = round.total - round.courseHandicap;
        });
        this.spinner = false;
      }, err => this.spinner = false);
  }

  filterRound(golfer): Round {
    return this.rounds.filter(round => round.golferId === golfer.id)[0];
  }

  onWeekChange(event) {
    if (event.value.number !== this.weekSelected.number) {
      this.weekSelected = event.value;
      this.getScoresByWeek(this.weekSelected.number);
    }
  }


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