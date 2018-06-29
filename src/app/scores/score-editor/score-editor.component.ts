import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { TeamRound } from '../../models/interfaces/team-round';
import { Team } from '../../models/interfaces/team';
import { PlayerName } from '../../models/classes/player-name';
import { Week } from '../../models/interfaces/week';
import { Course } from '../../models/interfaces/course';
import { Golfer } from '../../models/interfaces/golfer';
import { Match } from '../../models/interfaces/match';
import { MatchModel } from '../../models/classes/match-model';
import { DataService } from '../../core/services/data.service';


@Component({
  selector: 'app-score-editor',
  templateUrl: './score-editor.component.html',
  styleUrls: ['./score-editor.component.scss']
})
export class ScoreEditorComponent implements OnInit {
  //@Input() match?: Match | MatchModel;
  match: MatchModel;
  golfers: Golfer[];
  playerName = PlayerName;
  teamOneRound: TeamRound;
  teamTwoRound: TeamRound;
  weekSelected: Week;
  weeks: Week[];
  course: Course;
  teams: Team[];
  teamColor = {
    1: '#f44336', // MacGregor's team
    2: '#2196f3', // Warbird's team
    3: '#43a047' // GanMan's team
  };

  constructor(private afs: AngularFirestore,
              private ds: DataService) {}

  ngOnInit() {
    this.match = this.ds.newMatch('bar');
    console.log(this.match);
    this.ds.golfers().subscribe((data: Golfer[]) => this.golfers = data);
    this.ds.teams().subscribe((data: Team[]) => this.teams = data);

    this.ds.weeks().subscribe((data: Week[]) => {
        this.weeks = data;
        this.weekSelected = data.filter((week: Week) => week.number === data.length)[0];
        this.getCourseByWeek(this.weekSelected);
      });
  }

  getCourseByWeek(week: Week) {
    this.afs.collection<Course>('courses').doc<Course>(week.courseId).valueChanges()
      .subscribe((data: Course) => this.course = data);
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


  filterTeam(teamId: number) {
    return this.teams.filter((team: Team) => team.id === teamId)[0];
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
