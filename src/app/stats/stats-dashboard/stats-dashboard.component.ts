import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { IGolfer } from '../../models/interfaces/i-golfer';
import { Team } from '../../models/interfaces/team';
import { IMatch } from '../../models/interfaces/i-match';
import { DataService } from '../../core/services/data.service';
import { IWeek } from '../../models/interfaces/i-week';
import { ChartTypes } from '../../models/enums/chart-types.enum';
import { AngularFirestore } from 'angularfire2/firestore';
import { NgxObject } from '../../models/interfaces/ngx-object';


@Component({
  selector: 'app-stats-dashboard',
  templateUrl: './stats-dashboard.component.html',
  styleUrls: ['./stats-dashboard.component.scss']
})
export class StatsDashboardComponent implements OnInit {
  golfers: IGolfer[];
  membersByLeaguePoints: IGolfer[];
  teamsByLeaguePoints: Team[];
  points: NgxObject[] = [];
  matches: IMatch[];
  weeks: IWeek[];
  completedWeeks: IWeek[];
  teams: Team[];
  step = -1;
  ChartTypes = ChartTypes;
  chartType = ChartTypes.NumberCard;
  // bar chart options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Teams';
  showYAxisLabel = true;
  yAxisLabel = 'Points';
  colorScheme = {
    domain: [
      //'#f44336', // MacGregor's team
      //'#43a047', // Warbird's team
      //'#2196f3', // GanMan's team
    ]
  };

  constructor(private ds: DataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.ds.members().subscribe((data: IGolfer[]) => this.golfers = data);
    this.ds.membersOrderedBy('netPoints', 'desc').subscribe((data: IGolfer[]) => this.membersByLeaguePoints = data);
    this.ds.teams().subscribe((data: Team[]) => this.teams = data);
    this.ds.teamsOrderedBy('netPoints', 'desc').subscribe((data: Team[]) => {
      this.teamsByLeaguePoints = data;
      // This is for the ngx-charts
      data.forEach((team: Team, i) => {
        this.points.push({
          name: `Team ${team.name}`,
          value: team.points
        });
        this.colorScheme.domain[i] = team.colorScheme;
      });
    });
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

  onSelect(event) {
    console.log('event:', event, this.points);

    /*   switch (event.name) {
         case '':
           if (this.gross.doubles > this.gross.bogies) {
             this.openSnackBar('You have more doubles than bogies! You suck!!!', 'YOU SUCK!!!');
           }
           break;
         case 'Others':
           if (this.gross.others > this.gross.pars) {
             this.openSnackBar('You have more others than pars...You should just give up golf!', 'YOU SUCK!!!');
           }
           break;
         case 'Birdies':
           if (this.rounds.length > this.gross.birdies) {
             this.openSnackBar('You have more rounds than birdies...', 'HAHA!');
           }
           break;
         case 'Pars':
           if (this.gross.pars > this.gross.birdies) {
             this.openSnackBar('Will you make some birdies for once???', 'YA BITCH!!!');
           }
           break;
       }*/
  }

}
