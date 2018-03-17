import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-player-dialog-modal',
  templateUrl: './player-dialog-modal.component.html',
  styleUrls: ['./player-dialog-modal.component.scss']
})
export class PlayerDialogModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PlayerDialogModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
