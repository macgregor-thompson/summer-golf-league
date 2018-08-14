import { Component, OnInit } from '@angular/core';
import { Nav } from '../../models/interfaces/nav';
import { MatDialog } from '@angular/material';
import { LoginModalComponent } from '../login-modal/login-modal.component';

import { PlayerService } from '../services/player.service';
import { AngularFireStorage } from 'angularfire2/storage';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  profileUrl = null;
  currentPlayer = null;
  routes: Nav[] = [
    {
      path: '/',
      name: 'Scores',
      exact: true,
      icon: 'golf_course'
    },
    {
      path: '/rankings',
      name: 'Rankings',
      exact: true,
      icon: 'format_list_numbered'
    },
    {
      path: '/stats',
      name: 'Stats',
      exact: true,
      icon: 'insert_chart'
    },
    {
      path: '/players',
      name: 'Players',
      exact: true,
      icon: 'people'
    },
    {
      path: '/league-info',
      name: 'Info',
      exact: true,
      icon: 'info'
    }
  ];

  constructor(public dialog: MatDialog,
              public playerService: PlayerService,
              private storage: AngularFireStorage) {
  }

  ngOnInit() {
    this.playerService.player().subscribe(data => {
      console.log('authState:', data);
      this.currentPlayer = data;
      if (data) {
        if (data.photoURL) {
          this.profileUrl = data.photoURL;
        } else {
          const ref = this.storage.ref(`${data.uid}.png`);
          ref.getDownloadURL().subscribe(url => {
            console.log('download url:', url);
            this.profileUrl = url;
          });
        }
      } else {
        console.log('no authState data');
        this.profileUrl = null;
      }

    });
  }

  openLoginModal(): void {
    const dialogRef = this.dialog.open(LoginModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('login modal closed:', result);
    });
  }

  gitHubLogin() {
    this.playerService.loginWithGitHub();
  }

  logout() {
    this.playerService.logout().then(data => {
      console.log('signed out:', data);
    }).catch(e => {
      this.currentPlayer = null;
      console.log('error logging out:', e);
    });
  }

}
