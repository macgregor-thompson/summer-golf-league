import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-scorecard-modal',
  templateUrl: './scorecard-modal.component.html',
  styleUrls: ['./scorecard-modal.component.scss']
})
export class ScorecardModalComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<ScorecardModalComponent>,
               @Inject(MAT_DIALOG_DATA) data) { }

  ngOnInit() {
  }


  close() {
    this.dialogRef.close();
  }

}
