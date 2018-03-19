import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { PlayerDialogModalComponent } from '../player-dialog-modal/player-dialog-modal.component';
import { HandicapModalComponent } from '../handicap-modal/handicap-modal.component';
import { Golfer } from '../../models/interfaces/golfer';
import { PlayerService } from '../../core/services/player.service';
import { Team } from '../../models/interfaces/team';

@Component({
  selector: 'app-players-dashboard',
  templateUrl: './players-dashboard.component.html',
  styleUrls: ['./players-dashboard.component.scss']
})
export class PlayersDashboardComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  teams: Team[];
  golfers: MatTableDataSource<Golfer>;
  adminColumns = ['name', 'handicap', 'matches', 'team', 'edit'];
  displayedColumns = ['name', 'handicap', 'matches', 'team'];
  result;

  constructor(public playerService: PlayerService,
              private afs: AngularFirestore,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.golfersCollection = this.afs.collection<Golfer>('golfers', ref => ref.orderBy('displayName'));
    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => {
      this.teams = data;
    });
    this.golfersCollection.valueChanges().subscribe((data: Golfer[]) => {
      this.golfers = new MatTableDataSource<Golfer>(data);
    });
  }

  showHandicapModal() {
    const handicapModalRef = this.dialog.open(HandicapModalComponent, { width: '800px' });
    handicapModalRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      this.result = result;
    });
  }

  showPlayerEditorModal(golfer: Golfer) {
    let playerEditorDialogRef = this.dialog.open(PlayerDialogModalComponent, {
      data: { golfer: golfer ? Object.assign({}, golfer) : undefined}
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
