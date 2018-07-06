import { Component, OnInit, Input } from '@angular/core';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { AngularFirestore } from 'angularfire2/firestore';
import { Team } from '../../models/interfaces/team';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/classes/player';

@Component({
  selector: 'app-player-editor',
  templateUrl: './player-editor.component.html',
  styleUrls: ['./player-editor.component.scss']
})
export class PlayerEditorComponent implements OnInit {
  @Input() golfer: IGolfer;
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

  // this is how we can have a default team selected
  compareFn(team1: Team, team2: Team): boolean {
    return team1 && team2 ? team1.id === team2.id : team1 === team2;
  }

}
