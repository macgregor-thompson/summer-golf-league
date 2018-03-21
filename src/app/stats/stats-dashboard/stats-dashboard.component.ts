import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AngularFirestore} from 'angularfire2/firestore';

import {MockDataService} from '../../core/services/mock-data.service';
import {Golfer} from '../../models/interfaces/golfer';
import {Round} from '../../models/interfaces/round';
import {UserService} from '../../core/services/user.service';
import { Team } from '../../models/interfaces/team';


@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  golfers: Golfer[];
  currentGolfer: Golfer;
  teams: Team[];
  rounds: Round[];
  spinner = false;
  step = -1;

  constructor(private afs: AngularFirestore,
              private userService: UserService,
              private mockDataService: MockDataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.afs.collection<Golfer>('golfers').valueChanges()
      .subscribe((data: Golfer[]) => this.golfers = data);
    this.afs.collection<Team>('teams').valueChanges()
      .subscribe((data: Team[]) => this.teams = data);

    this.getAllScores();
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

  filterTeam(teamId: number) {
    if (teamId) {
      return this.teams.filter((team: Team) => team.id === teamId)[0];
    } else {
      return null;
    }
  }

  calculateAverage(golferId: number) {
    let totals = 0;
    const rounds = this.filterRounds(golferId);
    rounds.forEach((round: Round) => {
      totals = totals + round.total;
    });
    return totals / rounds.length;
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
