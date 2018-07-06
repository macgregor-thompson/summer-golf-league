import { Component, OnInit } from '@angular/core';
import { IWeek } from '../../models/interfaces/i-week';
import { MatDialogRef } from '@angular/material';
import { DataService } from '../../core/services/data.service';
import { Week } from '../../models/classes/week';

@Component({
  selector: 'app-week-modal',
  templateUrl: './week-modal.component.html',
  styleUrls: ['./week-modal.component.scss']
})
export class WeekModalComponent implements OnInit {
  weeks: IWeek[];
  today = new Date();
  newWeek: IWeek = {
    number: 1,
    date: new Date().toLocaleDateString(),
    completed: true,
    frontNine: true,
    courseId: 'IUbblBLeAMLOit5hfaVM'
  };

  constructor(public dialogRef: MatDialogRef<WeekModalComponent>,
              private ds: DataService) { }

  ngOnInit() {
    this.ds.weeks().subscribe((data: Week[]) => {
      this.weeks = data;
      this.newWeek.number = data.length + 1;
    });
  }

  addWeek() {
    if (this.weeks.filter(week => week.number === this.newWeek.number).length === 0) {
      this.newWeek.courseId = this.newWeek.frontNine ? 'IUbblBLeAMLOit5hfaVM' : 'KVGfWzdfjgK1n3Pqqs5L';
      console.log('adding new week:', this.newWeek);
      this.ds.weeksCollection().add(this.newWeek).then(data => {
        console.log('added new week:', data);
      }, e => {
        console.log('Error add=ing new week:', e);
      });
    } else {
      console.log(`Week ${this.newWeek.number} already exists!`);
    }
  }

  setDate(date) {
    this.newWeek.date = date;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
