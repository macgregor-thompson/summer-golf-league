import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IGolfer } from '../../models/interfaces/i-golfer';
import { Team } from '../../models/interfaces/team';
import { IMatch } from '../../models/interfaces/i-match';
import { DataService } from '../../core/services/data.service';
import { IWeek } from '../../models/interfaces/i-week';


@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  golfers: IGolfer[];
  membersByLeaguePoints: IGolfer[];
  teamsByLeaguePoints: Team[];
  matches: IMatch[];
  weeks: IWeek[];
  completedWeeks: IWeek[];
  teams: Team[];
  step = -1;

  constructor(private ds: DataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.ds.members().subscribe((data: IGolfer[]) => this.golfers = data);
    this.ds.membersOrderedBy('netPoints', 'desc').subscribe((data: IGolfer[]) => this.membersByLeaguePoints = data);
    this.ds.teams().subscribe((data: Team[]) => this.teams = data);
    this.ds.teamsOrderedBy('netPoints', 'desc').subscribe((data: Team[]) => this.teamsByLeaguePoints = data);
    this.ds.matches().subscribe((data: IMatch[]) => this.matches = data);
    this.ds.weeks().subscribe((data: IWeek[]) => {
      this.weeks = data;
      this.completedWeeks = data.filter(w => w.completed);
    });
  }


  worstWeek(weeklyPoints) {
    let pointsArr = Object.keys(weeklyPoints).map( key => weeklyPoints[key]);
    let worstWeek = Math.min.apply(null, pointsArr);
  }

  filterTeam(teamId: number) {
    if (teamId && this.teams)
      return this.teams.filter((team: Team) => team.id === teamId)[0];
  }

  weeklyPointsKeys(weeklyPoints) {
    return Object.keys(weeklyPoints);
  }

  weeksCompleted(weeks) {
    return;
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
