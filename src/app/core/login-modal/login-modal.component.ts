import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { PlayerService } from '../services/player.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})

export class LoginModalComponent implements OnInit {
  //currentGolfer: IGolfer;
  error = null;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(public playerService: PlayerService,
              public dialogRef: MatDialogRef<LoginModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    //this.currentGolfer = Object.assign({}, this.data.currentGolfer);
  }

  emailLogin() {
    //console.log(this.emailFormControl, this.passwordFormControl);
    this.playerService.loginWithEmail(this.emailFormControl.value, this.passwordFormControl.value).then(data => {
      console.log('signed in with email:', data);
      this.error = null;
      this.dialogRef.close();
    }).catch(e => {
      console.log('error logging in via email', e);
      this.error = e;
    });
  }

  logout() {
    this.playerService.logout();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
