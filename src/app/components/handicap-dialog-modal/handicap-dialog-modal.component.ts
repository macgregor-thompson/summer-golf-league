import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-handicap-dialog-modal',
  templateUrl: './handicap-dialog-modal.component.html',
  styleUrls: ['./handicap-dialog-modal.component.scss']
})
export class HandicapDialogModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<HandicapDialogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
