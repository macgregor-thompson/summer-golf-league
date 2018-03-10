import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Golfer } from '../../models/golfer';

import { MockDataService } from '../../services/mock-data.service';


@Component({
  selector: 'app-handicap-dialog-modal',
  templateUrl: './handicap-dialog-modal.component.html',
  styleUrls: ['./handicap-dialog-modal.component.scss']
})
export class HandicapDialogModalComponent implements OnInit {
  golfers: Golfer[];

  constructor(public dialogRef: MatDialogRef<HandicapDialogModalComponent>,
              private mockDataService: MockDataService) {}

  ngOnInit() {
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => this.golfers = data);

  }
  updateHandicap(golfer: Golfer) {
    golfer['updated'] = true;
    console.log('golfer:', golfer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
