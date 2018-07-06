import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { IGolfer } from '../../models/interfaces/i-golfer';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-handicap-dialog-modal',
  templateUrl: './handicap-modal.component.html',
  styleUrls: ['./handicap-modal.component.scss']
})
export class HandicapModalComponent implements OnInit {
  private golfersCollection: AngularFirestoreCollection<IGolfer>;
  golfers: Observable<IGolfer[]>;
  updatedGolfers: string[] = [];

  constructor(public dialogRef: MatDialogRef<HandicapModalComponent>,
              private afs: AngularFirestore) {}

  // This is just to serve as an example for how to add to the list
  /* addGolfer(golfer: IGolfer) {
     this.golfersCollection.add(golfer);
   }*/

  ngOnInit() {
    this.golfersCollection = this.afs.collection<IGolfer>('members', ref => ref.orderBy('firstName'));
    this.golfers = this.golfersCollection.valueChanges();
  }

  updateHandicap(golfer: IGolfer) {
    console.log('updating:', golfer.firstName, golfer.lastName);
    this.golfersCollection.doc(golfer.id)
      .update({ handicap: golfer.handicap })
      .then(data => {
        console.log('data:', data);
        if (this.updatedGolfers.indexOf(golfer.id) === -1) {
          this.updatedGolfers.push(golfer.id);
        }
        console.log('updatedGolfers:', this.updatedGolfers);
      })
      .catch(e => console.log(`Error updating ${golfer.firstName}'s handicap:`, e));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
