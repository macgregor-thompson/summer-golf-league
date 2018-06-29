import { Component, Input, OnInit } from '@angular/core';
import { Match } from '../../models/interfaces/match';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Course } from '../../models/interfaces/course';
import { PlayerName } from '../../models/classes/player-name';
import { TeamRound } from '../../models/interfaces/team-round';
import { Team } from '../../models/interfaces/team';

@Component({
  selector: 'app-scorecard-better-ball',
  templateUrl: './scorecard-better-ball.component.html',
  styleUrls: ['./scorecard-better-ball.component.scss']
})
export class ScorecardBetterBallComponent implements OnInit {
  @Input() match: Match;
  @Input() roundsCollection: AngularFirestoreCollection<TeamRound>;
  @Input() course: Course;
  playerName = PlayerName;
  teamOneRound: TeamRound;
  teamTwoRound: TeamRound;
  teams: Team[];
  teamColor = {
    1: '#f44336', // MacGregor's team
    2: '#43a047', // Warbird's team
    3: '#2196f3' // GanMan's team
  };

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
    this.roundsCollection.doc<TeamRound>(this.match.teamOneRoundId).valueChanges()
      .subscribe((data: TeamRound) => this.teamOneRound = data);
    this.roundsCollection.doc<TeamRound>(this.match.teamTwoRoundId).valueChanges()
      .subscribe((data: TeamRound) => this.teamTwoRound = data);

    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => this.teams = data);
  }

  determineMatch() {
    let a = 0, b = 0;
    this.teamOneRound.netScores.forEach((score, i) => {
      if (score < this.teamTwoRound.netScores[i]) {
        a++;
      } else if (score > this.teamTwoRound.netScores[i]) {
        b++;
      }
    });
    if (a === b) {
      return 'Tie';
    } else if (a > b) {
      let playerA = this.playerName[this.teamOneRound.aPlayerRound.golferId];
      let playerB = this.playerName[this.teamOneRound.bPlayerRound.golferId];
      return `${playerA} & ${playerB} <br> win ${a - b} up`;
    } else if (a < b) {
      let playerA = this.playerName[this.teamTwoRound.aPlayerRound.golferId];
      let playerB = this.playerName[this.teamTwoRound.bPlayerRound.golferId];
      return `${playerA} & ${playerB} <br> win ${b - a} up`;
    }
  }

/*
  playerName(golferId) {
    console.log('name:', PlayerName[golferId]);
    return PlayerName[golferId];
  }*/

  filterTeam(teamId: number) {
    if (teamId) {
      return this.teams.filter((team: Team) => team.id === teamId)[0];
    } else {
      return null;
    }
  }

  scoreClass(score: number, i) {
    const par = this.course.holes[i].par;
    if (score === par) {
      return 'par';
    } else if (score === par + 1) {
      return 'bogie';
    } else if (score === par + 2) {
      return 'double-bogie';
    } else if (score > par + 2) {
      return 'other';
    } else if (score === par - 1) {
      return 'birdie';
    } else if (score === par - 2) {
      return 'eagle';
    } else {
      return 'unknown';
    }
  }

  numStrokes(strokes, i) {
    console.log('strokes:', strokes, this.course.holes[i].stroke);
    if (strokes > 0) {
      if (strokes > 9) {
        let unFuckingBelievable = strokes - 9;
        return unFuckingBelievable >= this.course.holes[i].stroke ? [1, 2] : [1];
      } else {
        return strokes >= this.course.holes[i].stroke ? [1] : [];
      }
    }
  }

}
