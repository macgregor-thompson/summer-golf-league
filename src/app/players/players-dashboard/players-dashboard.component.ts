import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { AngularFirestore } from 'angularfire2/firestore';

import { PlayerDialogModalComponent } from '../player-dialog-modal/player-dialog-modal.component';
import { HandicapModalComponent } from '../handicap-modal/handicap-modal.component';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { Team } from '../../models/interfaces/team';
import { DataService } from '../../core/services/data.service';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  teams: Team[];
  golfers: MatTableDataSource<IGolfer>;
  subs: MatTableDataSource<IGolfer>;
  adminColumns = ['displayName', 'handicap',  'points', 'paid', 'team', 'edit'];
  displayedColumns = ['displayName', 'handicap', 'points', 'paid', 'team'];

  subAdminColumns = ['subDisplayName', 'subHandicap', 'subTeam', 'edit'];
  subDisplayedColumns = ['subDisplayName', 'subHandicap', 'subTeam'];

  constructor(private ds: DataService,
              public playerService: PlayerService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.ds.teams().subscribe((data: Team[]) => this.teams = data);
    this.ds.members().subscribe((data: IGolfer[]) => this.golfers = new MatTableDataSource<IGolfer>(data));
    this.ds.subs().subscribe((data: IGolfer[]) => this.subs = new MatTableDataSource<IGolfer>(data));
  }

  showHandicapModal() {
    this.dialog.open(HandicapModalComponent, { width: '800px' });
  }

  showPlayerEditorModal(golfer: IGolfer) {
    let playerEditorDialogRef = this.dialog.open(PlayerDialogModalComponent, {
      data: { golfer: golfer ? Object.assign({}, golfer) : undefined }
    });
    playerEditorDialogRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      //add player to firestore here
    });
  }

  filterTeam(teamId: number) {
    if (teamId) {
      return this.teams.filter((team: Team) => team.id === teamId)[0];
    } else {
      return null;
    }
  }

}
