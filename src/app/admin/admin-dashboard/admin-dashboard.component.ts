import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../core/services/player.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

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
