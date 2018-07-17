import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { IMatch } from '../../models/interfaces/i-match';
import { Format } from '../../models/enums/format.enum';
import { FormatName } from '../../models/classes/format-name';


@Component({
  selector: 'app-scorecard-modal',
  templateUrl: './scorecard-modal.component.html',
  styleUrls: ['./scorecard-modal.component.scss']
})
export class ScorecardModalComponent implements OnInit {
  imageUrl: string;
  match: IMatch;
  Format = Format;
  formatName = FormatName;

  constructor( private dialogRef: MatDialogRef<ScorecardModalComponent>,
               @Inject(MAT_DIALOG_DATA) match) {
    this.match = match;
    if (match.picture) {
      this.imageUrl = `../../../assets/img/scorecards/${match.picture}.png`;
    }
  }

  ngOnInit() {
    console.log('imageUrl:', this.imageUrl);
  }


  close() {
    this.dialogRef.close();
  }

}
