import {Component, OnInit} from '@angular/core';
import {MockDataService} from '../../core/services/mock-data.service';
import {Golfer} from '../../models/interfaces/golfer';
import {Round} from '../../models/interfaces/round';
import {Week} from '../../models/interfaces/week';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { PlayerService } from '../../core/services/player.service';
import { MatDialog } from '@angular/material';
import { WeekModalComponent } from '../week-modal/week-modal.component';
import { Team } from '../../models/interfaces/team';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {
  golfers: Observable<Golfer[]>;
  rounds: Round[];
  teams: Team[];
  step = 0;
  weekSelected: Week;
  weeklyTotals = {};
  weeklyNet = [];
  weeks: Week[];
  spinner = false;


  constructor(private afs: AngularFirestore,
              public playerService: PlayerService,
              public dialog: MatDialog,
              private mockDataService: MockDataService) {

  }


  ngOnInit() {
    this.getWeeks();
    this.getGolfers();
    this.getScoresByWeek(2);
    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  getWeeks() {
    this.afs.collection<Week>('weeks', ref => ref.orderBy('number')).valueChanges()
      .subscribe((data: Week[]) => {
        this.weeks = data;
        this.weekSelected = data.filter((week: Week) => week.number === data.length)[0];
      });
  }

  openWeekModal() {
    this.dialog.open(WeekModalComponent);
  }


  getGolfers() {
    this.golfers = this.afs.collection<Golfer>('members').valueChanges();
  }

  getScoresByWeek(weekNum: number) {
    this.spinner = true;
    this.mockDataService.getScoresByWeek(weekNum)
      .subscribe((data: Round[]) => {
        this.rounds = data;
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

  filterTeam(teamId: number) {
    return this.teams.filter((team: Team) => team.id === teamId)[0];
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
