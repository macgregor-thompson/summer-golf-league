import { Component, OnInit, Input } from '@angular/core';
import { Golfer, Player } from '../../models/golfer';
import { AngularFirestore } from 'angularfire2/firestore';
import { Team } from '../../models/team';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent implements OnInit {
  @Input() golfer: Golfer;
  teams: Team[];

  constructor(private afs: AngularFirestore,
              private userService: UserService) {}

  ngOnInit() {
    this.teams = this.userService.getTeams();

    console.log('1:', this.golfer);
    if (!this.golfer) {
      this.golfer = new Player;
      console.log('1:', this.golfer);
    }
  }

  logForm() {
    console.log('player form:', this.golfer);
  }

}
