import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { PlayerDialogModalComponent } from '../player-dialog-modal/player-dialog-modal.component';
import { HandicapDialogModalComponent } from '../handicap-dialog-modal/handicap-dialog-modal.component';
import { Golfer } from '../../models/golfer';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  golfers: Observable<Golfer[]>;
  result;

  constructor(private afs: AngularFirestore,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.golfersCollection = this.afs.collection<Golfer>('golfers');
    this.golfers = this.golfersCollection.valueChanges();
    console.log('this.golfersCollection:', this.golfersCollection);
    console.log('golfers:', this.golfers);
  }

  showHandicapModal() {
    const handicapModalRef = this.dialog.open(HandicapDialogModalComponent, { width: '800px' });
    handicapModalRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      this.result = result;
    });
  }

  showPlayerEditorModal() {
    const playerEditorDialogRef = this.dialog.open(PlayerDialogModalComponent, { width: '800px' });
    playerEditorDialogRef.afterClosed().subscribe(result => {
      console.log('result:', result);
      //add player to firestore here
    });
  }


}
