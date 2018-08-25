import { Component, OnInit, Input } from '@angular/core';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { AngularFirestore } from 'angularfire2/firestore';
import { Team } from '../../models/interfaces/team';
import { Observable } from 'rxjs/Observable';
import { Player } from '../../models/classes/player';
import { MatInputModule } from '@angular/material';


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
    this.afs.collection<Team>('teams', ref => ref.orderBy('id')).valueChanges()
      .subscribe((data: Team[]) => this.teams = data);

    if (!this.golfer) {
      this.golfer = new Player;
      console.log('new player:', this.golfer);
    }
  }



  setTeam(teamSelect) {
    //console.log('team:', this.filterTeam(teamSelect.value));
    this.golfer.team = this.filterTeam(teamSelect.value);
  }

  filterTeam(teamId: number) {
    return this.teams.filter((team: Team) => team.id === teamId)[0];
  }

  // this is how we can have a default team selected
  /*compareFn(team1: Team, team2: Team): boolean {
    return team1 && team2 ? team1.id === team2.id : team1 === team2;
  }*/

}
