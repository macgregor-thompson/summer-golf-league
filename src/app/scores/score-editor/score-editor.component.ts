import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Team } from '../../models/interfaces/team';
import { IWeek } from '../../models/interfaces/i-week';
import { ICourse } from '../../models/interfaces/i-course';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { DataService } from '../../core/services/data.service';
import { Format } from '../../models/enums/format.enum';
import { Match } from '../../models/classes/match';
import { Course } from '../../models/classes/course';
import { Player } from '../../models/classes/player';
import { WeekModalComponent } from '../week-modal/week-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-score-editor',
  templateUrl: './score-editor.component.html',
  styleUrls: ['./score-editor.component.scss']
})
export class ScoreEditorComponent implements OnInit {
  @Input() matchId?: string;
  match: Match;
  golfers: Player[];
  Format = Format;
  weekSelected: IWeek;
  weeks: IWeek[];
  courses: Course[];
  courseSelected: Course;
  teams: Team[];
  teamA: Team;
  teamB: Team;
  formatSelected: Format = Format.TwoManBetterBall;
  showScoreCard = false;
  teamColor = {
    1: '#f44336', // MacGregor's team
    2: '#2196f3', // Warbird's team
    3: '#43a047' // GanMan's team
  };

  constructor(private afs: AngularFirestore,
              private ds: DataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    //this._getMatch();
    this.ds.allPlayers().subscribe((data: Player[]) => this.golfers = data);
    this.ds.teams().subscribe((data: Team[]) => {
      this.teams = data.filter((team: Team) => team.id < 4);
    });
    this.ds.courses().subscribe((data: Course[]) => {
      this.courses = data;
      this.courseSelected = data[0];
    });

    this.ds.weeks().subscribe((data: IWeek[]) => {
      this.weeks = data;
      this.weekSelected = data.filter((week: IWeek) => week.number === data.length)[0];
      //this.getCourseByWeek(this.weekSelected);
    });

  /*  //TODO: remove this...
    this.teamA = this.teams[2];
    this.teamB = this.teams[0];
    this.match = new Match(5, 1, false);
*/
  }

  onSelectTeamA(event) {
    this.teamA = event.value;
    console.log('Team A:', this.teamA);
  }

  setStrokes(stackStrokes: boolean, team, round, event) {
    console.log(stackStrokes, team, round, event);
    if (stackStrokes) {
      this.match[team][round].strokesGetting = parseInt(event.target.value, 10);
    } else {
      this.match[team][round].matchStrokes = parseInt(event.target.value, 10);
    }
  }

  onStepperChange(event) {
    if (event.selectedIndex === 3 && !this.match) {
      this.newMatch();
    }
  }

  newMatch() {
    if (this.weekSelected && this.formatSelected && this.courseSelected) {
      this.match = new Match(this.weekSelected.number, this.formatSelected, this.courseSelected.frontNine);
    } else {
      console.log('cannot create new match)');
    }
    console.log('match:', this.match);
  }

  onSelectPlayer(team, round, player, event) {
    console.log('match:', this.match);
    this.match[team][round][player] = event.value;
  }

  addScorePlayer(team, round, hole, event) {
    this.match[team][round].scores[hole] = parseInt(event.target.value, 10);
    console.log('scores:', this.match[team][round]);
    this.match[team][round].total = Object.values(this.match[team][round].scores).reduce((a, b) => a + b);
  }

  openWeekModal() {
    this.dialog.open(WeekModalComponent);
  }


  onWeekSelect(event) {
    this.weekSelected = event.value;
    console.log('this.weekSelected:', this.weekSelected);
  }

  onCourseSelect(event) {
    this.courseSelected = event.value;
    console.log('this.course:', this.courseSelected);
  }

  onFormatSelect(event) {
    this.formatSelected = event.value;
    console.log('this.format:', this.formatSelected);
  }


  ////////////////////////////////////////////////////////////////////////////

  getCourseByWeek(week: IWeek) {
    this.afs.collection<ICourse>('courses').doc<ICourse>(week.courseId).valueChanges()
      .subscribe((data: ICourse) => this.courseSelected = data);
  }

  _getMatch() {
    if (this.matchId) {
      //get match
    } else {
      //this.match = new Match(1, 1, true);
    }
  }

  /* determineMatch() {
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

 */
  filterTeam(teamId: number) {
    return this.teams.filter((team: Team) => team.id === teamId)[0];
  }

 /* scoreClass(score: number, i) {
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
  }*/

 /* numStrokes(strokes, i) {
    if (strokes > 0) {
      if (strokes > 9) {
        let unFuckingBelievable = strokes - 9;
        return unFuckingBelievable >= this.course.holes[i].stroke ? [1, 2] : [1];
      } else {
        return strokes >= this.course.holes[i].stroke ? [1] : [];
      }
    }
  }*/
}
