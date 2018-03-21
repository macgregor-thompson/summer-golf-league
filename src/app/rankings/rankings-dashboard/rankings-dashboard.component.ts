import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Team } from '../../models/interfaces/team';
import { NgxObject } from '../../models/interfaces/ngx-object';
import { ChartTypes } from '../../models/enums/chart-types.enum';

@Component({
  selector: 'app-rankings-dashboard',
  templateUrl: './rankings-dashboard.component.html',
  styleUrls: ['./rankings-dashboard.component.scss']
})
export class RankingsDashboardComponent implements OnInit {
  spinner = false;
  points: NgxObject[] = [];
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
      '#f44336', // MacGregor's team
      '#43a047', // Warbird's team
      '#2196f3', // GanMan's team
    ]
  };

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs.collection<Team>('teams', ref => ref.where('id', '<', 4)).valueChanges()
      .subscribe((data: Team[]) => {
        data.forEach((team: Team) => {
          this.points.push({
            name: team.name,
            value: team.points
          });
        });
      }, e => console.log('Error fetching teams:', e));
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
