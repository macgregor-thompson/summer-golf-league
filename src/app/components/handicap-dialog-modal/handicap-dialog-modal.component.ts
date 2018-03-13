import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Golfer } from '../../models/golfer';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-handicap-dialog-modal',
  templateUrl: './handicap-dialog-modal.component.html',
  styleUrls: ['./handicap-dialog-modal.component.scss']
})
export class HandicapDialogModalComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<Golfer>;
  golfers: Observable<Golfer[]>;

  constructor(public dialogRef: MatDialogRef<HandicapDialogModalComponent>,
              private afs: AngularFirestore) {}

  // This is just to serve as an example for how to add to the list
 /* addGolfer(golfer: Golfer) {
    this.golfersCollection.add(golfer);
  }*/

  ngOnInit() {
    this.golfersCollection = this.afs.collection<Golfer>('golfers', ref => ref.orderBy('displayName'));
    this.golfers = this.golfersCollection.valueChanges();
  }

  updateHandicap(golfer: Golfer) {
    golfer['updated'] = true;
    console.log('golfer:', golfer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
