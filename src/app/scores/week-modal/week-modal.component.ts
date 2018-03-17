import { Component, OnInit } from '@angular/core';
import { Week } from '../../models/week';
import { MatDialogRef } from '@angular/material';
import { TemplateRef } from '@angular/core';

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-week-modal',
  templateUrl: './week-modal.component.html',
  styleUrls: ['./week-modal.component.scss']
})
export class WeekModalComponent implements OnInit {
  today = new Date();
  newWeek: Week = {
    number: null,
    date: new Date().toLocaleDateString()
  };
  weeksCollection: AngularFirestoreCollection<Week>;
  weeks: Week[];

  constructor(public dialogRef: MatDialogRef<WeekModalComponent>,
              private afs: AngularFirestore) { }

  ngOnInit() {
    this.weeksCollection = this.afs.collection<Week>('mockWeeks');
    this.weeksCollection.valueChanges().subscribe((data) => {
      this.weeks = data;
      this.newWeek.number = data.length + 1;
    });
  }

  addWeek() {
    this.weeksCollection.add(this.newWeek).then(data => {
      console.log('added new week:', data);
    }, e => {
      console.log('Error add=ing new week:', e);
    });
  }

  setDate(date) {
    this.newWeek.date = date;
    console.log(date);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
