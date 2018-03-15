import {Component, OnInit, Inject} from '@angular/core';
import {Golfer} from '../../models/golfer';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  currentGolfer: Golfer;

  constructor(public dialogRef: MatDialogRef<LoginModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.currentGolfer = Object.assign({}, this.data.currentGolfer);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
