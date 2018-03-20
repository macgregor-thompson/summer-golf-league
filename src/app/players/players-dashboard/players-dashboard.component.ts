import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort, MatTableDataSource } from '@angular/material';

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
export class PlayersDashboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  teams: Team[];
  golfers: MatTableDataSource<Golfer>;
  adminColumns = ['displayName', 'handicap', 'matches', 'team', 'edit'];
  displayedColumns = ['displayName', 'handicap', 'matches', 'team'];
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
      this.golfers.sort = this.sort;
    });
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {

  }

  showHandicapModal() {
    this.dialog.open(HandicapModalComponent, { width: '800px' });
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
