import {Component, OnInit} from '@angular/core';
import {Nav} from '../../models/interfaces/nav';
import {MatDialog} from '@angular/material';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {Golfer} from '../../models/interfaces/golfer';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  golfers: Observable<Golfer[]>;
  currentGolfer: Golfer;
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
    /*{
      path: '/scores',
      name: 'Scores',
      exact: true,
      icon: 'golf_course'
    },
    {
      path: '/stats',
      name: 'Stats',
      exact: true,
      icon: 'insert_chart'
    },*/
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


  constructor(private afs: AngularFirestore,
              public playerService: PlayerService) {
  }

  ngOnInit() {
    this.golfers = this.afs.collection<Golfer>('members').valueChanges();
  }

  gitHubLogin() {
    this.playerService.loginWithGitHub();
  }

  logout() {
    this.playerService.logout();
  }

}
