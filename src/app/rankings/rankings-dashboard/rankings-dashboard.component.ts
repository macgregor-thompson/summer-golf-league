import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { Team } from '../../models/interfaces/team';
import { NgxObject } from '../../models/interfaces/ngx-object';
import { ChartTypes } from '../../models/enums/chart-types.enum';
import { IGolfer } from '../../models/interfaces/i-golfer';

@Component({
  selector: 'app-rankings-dashboard',
  templateUrl: './rankings-dashboard.component.html',
  styleUrls: ['./rankings-dashboard.component.scss']
})
export class RankingsDashboardComponent implements OnInit {
  spinner = false;
  points: NgxObject[] = [];
  teams: Team[];
  golfers: MatTableDataSource<IGolfer>;
  members: IGolfer[];
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
      // '#43a047', // Warbird's team
      // '#2196f3', // GanMan's team
    ]
  };
  displayedColumns = ['ranking', 'displayName', 'points', 'team'];


  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs.collection<Team>('teams', ref => ref.orderBy('points', 'desc')).valueChanges()
      .subscribe((data: Team[]) => {
        this.teams = data;
        data.forEach((team: Team) => {
          if (team.id < 4) {
            this.colorScheme.domain.push(team.colorScheme);
            this.points.push({
              name: team.name,
              value: team.points
            });
          }
        });
      }, e => console.log('Error fetching teams:', e));

    /* this.afs.collection<Team>('teams', ref => ref.where('id', '<', 4)).valueChanges()
       .subscribe((data: Team[]) => {
         this.teams = data;
         data.forEach((team: Team) => {
           this.points.push({
             name: team.name,
             value: team.points
           });
         });
       }, e => console.log('Error fetching teams:', e));*/

    this.afs.collection<IGolfer>('members', ref => ref.orderBy('points', 'desc')).valueChanges()
      .subscribe((data: IGolfer[]) => {
        this.members = data;
        let ranked = data.map((golfer, i) => {
          if (i > 0) {
            let prev = data[i - 1];
            if (prev.points === golfer.points) {
              golfer.rank = `T${prev.rank}`;
              prev.rank = `T${prev.rank}`;
            } else {
              golfer.rank = i + 1;
            }
          } else {
            golfer.rank = 1;
          }
          return golfer;
        });

        this.golfers = new MatTableDataSource<IGolfer>(ranked);
      });


  }

  setStarColor(i) {
    if (i === 0) {
      return 'gold-star';
    } else {
      if (this.members[0].points === this.members[i].points) {
        return 'gold-star';
      } else {
        return 'silver-star';
      }
    }
  }

  filterTeam(teamId: number) {
    if (teamId) {
      return this.teams.filter((team: Team) => team.id === teamId)[0];
    } else {
      return null;
    }
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
