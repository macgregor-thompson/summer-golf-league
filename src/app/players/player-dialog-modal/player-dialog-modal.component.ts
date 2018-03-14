import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-player-dialog-modal',
  templateUrl: './player-dialog-modal.component.html',
  styleUrls: ['./player-dialog-modal.component.scss']
})
export class PlayerDialogModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PlayerDialogModalComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
