import {Component, OnInit} from '@angular/core';
import {Nav} from '../../models/nav';
import {MatDialog} from '@angular/material';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {Golfer} from '../../models/golfer';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services/user.service';


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
      name: 'Home',
      exact: true,
      icon: 'home'
    },
    {
      path: '/rankings',
      name: 'Rankings',
      exact: true,
      icon: 'format_list_numbered'
    },
    {
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
    },
    {
      path: '/players',
      name: 'Players',
      exact: true,
      icon: 'people'
    },
    {
      path: '/rules',
      name: 'Rules',
      exact: true,
      icon: 'priority_high'
    }
  ];


  constructor(private afs: AngularFirestore,
              public dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit() {
    this.golfers = this.afs.collection<Golfer>('golfers').valueChanges();
    this.getCurrentGolfer();
  }

  openLoginModal() {
    const loginModalRef = this.dialog.open(LoginModalComponent,
      {
        width: '400px',
        data: {golfers: this.golfers, currentGolfer: this.currentGolfer}
      });
    loginModalRef.afterClosed().subscribe((result: Golfer) => {
      console.log('result:', result);
      this.setGolfer(result);
    });
  }

  getCurrentGolfer() {
    this.userService.getCurrentGolfer().subscribe((data: Golfer) => this.currentGolfer = data);
  }

  setGolfer(golfer: Golfer) {
    this.currentGolfer = golfer;
   this.userService.setCurrentGolfer(golfer).subscribe(data => console.log('set user...data:', data));

  }

  logout() {
    console.log('logging out');
    this.currentGolfer = null;
    this.userService.removeCurrentGolfer().subscribe(data => console.log('set user...data:', data));
  }

}
