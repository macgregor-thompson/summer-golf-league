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

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.afs.collection<Team>('teams', ref => ref.orderBy('captain')).valueChanges()
      .subscribe((data: Team[]) => this.teams = data);

    console.log('1:', this.golfer);
    if (!this.golfer) {
      this.golfer = new Player;
      console.log('new player:', this.golfer);
    }
  }

  compareFn(team1: Team, team2: Team): boolean {
    return team1 && team2 ? team1.id === team2.id : team1 === team2;
  }

  log() {
    console.log('player:', this.golfer);
  }

}
