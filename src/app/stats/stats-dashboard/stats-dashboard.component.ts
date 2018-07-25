import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import {AngularFirestore} from 'angularfire2/firestore';

import {IGolfer} from '../../models/interfaces/i-golfer';
import {IRound} from '../../models/interfaces/i-round';
import { Team } from '../../models/interfaces/team';
import { IMatch } from '../../models/interfaces/i-match';
import { DataService } from '../../core/services/data.service';


@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  golfers: IGolfer[];
  matches: IMatch[];
  teams: Team[];
  step = -1;

  constructor(private ds: DataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.ds.members().subscribe((data: IGolfer[]) => this.golfers = data);
    this.ds.teams().subscribe((data: Team[]) => this.teams = data);
    this.ds.matches().subscribe( (data: IMatch[]) => this.matches = data);
  }

  filterTeam(teamId: number) {
    if (teamId) {
      return this.teams.filter((team: Team) => team.id === teamId)[0];
    } else {
      return null;
    }
  }

/*  calculateAverage(golferId: number) {
    let totals = 0;
    const rounds = this.filterRounds(golferId);
    rounds.forEach((round: IRound) => {
      totals = totals + round.total;
    });
    return totals / rounds.length;
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
