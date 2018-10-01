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
  teams: Team[];
  teamData: MatTableDataSource<Team>;
  golfers: MatTableDataSource<IGolfer>;
  members: IGolfer[];

  teamColumns = ['teamRanking', 'teamName', 'teamNetPoints', 'teamPoints', 'teamWorstWeek', 'teamSecondWorstWeek', 'teamBonusPoints', 'teamPointsBehind'];
  playerColumns = ['ranking', 'displayName', 'netPoints', 'points', 'worstWeek', 'secondWorstWeek', 'pointsBehind', 'team'];
  playerFirstPoints = 0;
  teamFirstPoints = 0;



  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.afs.collection<Team>('teams', ref => ref.orderBy('netPoints', 'desc')).valueChanges()
      .subscribe((data: Team[]) => {
        this.teams = data;
        this.teamFirstPoints = data[0].netPoints;
        let rankedTeams = data.map((team, i) => {
          if (i > 0) {
            let prev = data[i - 1];
            if (prev.netPoints === team.netPoints) {
              team.rank = `T${prev.rank}`;
              prev.rank = `T${prev.rank}`;
            } else {
              team.rank = i + 1;
            }
          } else {
            team.rank = 1;
          }
          return team;
        });
        this.teamData = new MatTableDataSource<Team>(rankedTeams);
      }, e => console.log('Error fetching teams:', e));



    this.afs.collection<IGolfer>('members', ref => ref.orderBy('netPoints', 'desc')).valueChanges()
      .subscribe((data: IGolfer[]) => {
        this.members = data;
        this.playerFirstPoints = data[0].netPoints;
        let ranked = data.map((golfer, i) => {
          if (i > 0) {
            let prev = data[i - 1];
            if (prev.netPoints === golfer.netPoints) {
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
      if (this.members[0].netPoints === this.members[i].netPoints) {
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


}
