import { Component, OnInit } from '@angular/core';

import { MockDataService } from '../../services/mock-data.service';
import { Course } from '../../models/course';
import { Golfer } from '../../models/golfer';
import { LeagueStatus } from '../../models/enums/league-status.enum';
import { Round } from '../../models/round';
import { Week } from '../../models/week';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  courses: Course[];
  golfers: Golfer[];
  rounds: Round[];
  members: Golfer[];
  substitutes: Golfer[];
  step = -1;
  weekSelected: Week;
  weeklyTotals = {};
  weeklyNet = [];
  weeks: Week[];
  spinner = false;


  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getWeeks();
    this.getCourses();
    this.getGolfers();
    //this.getAllScores();
    this.getScoresByWeek(2);
  }

  getWeeks() {
    this.mockDataService.getWeeks()
      .subscribe((data: Week[]) => {
        this.weeks = data;
        this.weekSelected = data.filter((week: Week) => week.number === data.length)[0];
        console.log('weekSelected:', this.weekSelected);
      });
  }

  getCourses() {
    this.mockDataService.getCourses()
      .subscribe((data: Course[]) => this.courses = data);
  }

  getGolfers() {
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => {
        this.golfers = data;
        this.members = data.filter((golfer: Golfer) => golfer.leagueStatus === LeagueStatus.Member);
        this.substitutes = data.filter((golfer: Golfer) => golfer.leagueStatus === LeagueStatus.Substitute);
      });
  }

  getAllScores() {
    this.mockDataService.getAllScores()
      .subscribe((data: Round[]) => {
        this.rounds = data;
        data.forEach((round: Round) => {
          this.weeklyTotals[round.golferId] = round.total;
        });
      });
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
