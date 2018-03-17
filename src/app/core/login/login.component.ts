import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public playerService: PlayerService) { }

  ngOnInit() {
  }

  gitHubLogin() {
    this.playerService.loginWithGitHub();
  }

  logout() {
    this.playerService.logout();
  }

}
