import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

import { AngularFirestore } from 'angularfire2/firestore';

import { PlayerDialogModalComponent } from '../player-dialog-modal/player-dialog-modal.component';
import { HandicapModalComponent } from '../handicap-modal/handicap-modal.component';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { PlayerService } from '../../core/services/player.service';
import { Team } from '../../models/interfaces/team';

@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  teams: Team[];
  golfers: MatTableDataSource<IGolfer>;
  adminColumns = ['displayName', 'handicap',  'points', 'team', 'edit'];
  displayedColumns = ['displayName', 'handicap', 'points', 'team'];

  constructor(public playerService: PlayerService,
              private afs: AngularFirestore,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.afs.collection<Team>('teams').valueChanges()
      .subscribe((data: Team[]) => this.teams = data);

    this.afs.collection<IGolfer>('members', ref => ref.orderBy('displayName')).valueChanges()
      .subscribe((data: IGolfer[]) => {
      //data.sort((a: IGolfer, b: IGolfer) => Number(b.leagueMember) - Number(a.leagueMember));
      this.golfers = new MatTableDataSource<IGolfer>(data);
    });
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
