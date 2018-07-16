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
import { PlayerId } from '../../models/classes/player-id';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-score-editor',
  templateUrl: './score-editor.component.html',
  styleUrls: ['./score-editor.component.scss']
})
export class ScoreEditorComponent implements OnInit {
  @Input() matchId?: string;
  match: Match;
  players: IGolfer[];
  subs: IGolfer[];
  Format = Format;
  weekSelected: IWeek;
  weeks: IWeek[];
  courses: Course[];
  courseSelected: Course;
  teams: Team[];
  teamA: Team;
  teamB: Team;
  teamC: Team;
  formatSelected: Format = Format.TwoManBetterBall;
  showScoreCard = false;
  showMatchScoreInputs = false;
  teamColor = {
    1: '#f44336', // MacGregor's team
    2: '#2196f3', // Warbird's team
    3: '#43a047' // GanMan's team
  };
  teamAPlayerASub = false;
  teamAPlayerBSub = false;
  teamBPlayerASub = false;
  teamBPlayerBSub = false;
  ////For Team Scramble ////
  teamAPlayerCSub = false;
  teamAPlayerDSub = false;
  teamBPlayerCSub = false;
  teamBPlayerDSub = false;
  teamCPlayerASub = false;
  teamCPlayerBSub = false;
  teamCPlayerCSub = false;
  teamCPlayerDSub = false;


  // TODO: Remove this
  havePlayers = false;
  haveTeams = false;
  matchCopy = {};


  constructor(private afs: AngularFirestore,
              private router: Router,
              private ds: DataService,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.ds.members().subscribe((data: IGolfer[]) => {
      this.players = data;
      // TODO: Remove this
      //this.havePlayers = true;
      //this.mockMatch();
    });
    this.ds.teams().subscribe((data: Team[]) => {
      this.teams = data.filter((team: Team) => team.id < 4);
      // TODO: Remove this
     // this.haveTeams = true;
     // this.mockMatch();
    });
    this.ds.courses().subscribe((data: Course[]) => {
      this.courses = data;
      this.courseSelected = data[0];
    });

    this.ds.weeks().subscribe((data: IWeek[]) => {
      this.weeks = data;
      this.weekSelected = data.filter((week: IWeek) => week.number === data.length)[0];
    });
    this.ds.subs().subscribe((data: IGolfer[]) => this.subs = data);
  }


  saveScores() {
    let fuckedUpStepBecauseYouCantAddAClassToFireStore = JSON.parse(JSON.stringify(this.match));
    this.ds.matchesCollection().add(fuckedUpStepBecauseYouCantAddAClassToFireStore).then(data => {
      console.log('added new match:', data);
      this.router.navigate(['']);
    }, e => {
      console.log('Error adding new match:', e);
    });
  }

  logStuff() {
    console.log('match:', this.match);
    let fuckedUpStepBecauseYouCantAddAClassToFireStore = JSON.parse(JSON.stringify(this.match));
    console.log('ridiculousness:', fuckedUpStepBecauseYouCantAddAClassToFireStore);
  }

  mockMatch() {
    if (this.havePlayers && this.haveTeams) {
      this.match = new Match(5, 1, false);

      this.match.teamOne.roundA.playerA = this.players.filter(p => p.id === PlayerId.GanMan)[0];
      this.match.teamOne.roundA.strokesGetting = 3;
      this.match.teamOne.roundA.matchStrokes = 3;

      this.match.teamOne.roundB.playerA = this.players.filter(p => p.id === PlayerId.Allen)[0];
      this.match.teamOne.roundB.strokesGetting = 8;
      this.match.teamOne.roundB.matchStrokes = 8;

      this.match.teamTwo.roundA.playerA = this.players.filter(p => p.id === PlayerId.MacGregor)[0];
      this.match.teamTwo.roundA.strokesGetting = 0;
      this.match.teamTwo.roundA.matchStrokes = 0;

      this.match.teamTwo.roundB.playerA = this.players.filter(p => p.id === PlayerId.Pickles)[0];
      this.match.teamTwo.roundB.strokesGetting = 8;
      this.match.teamTwo.roundB.matchStrokes = 8;

      this.teamA = this.teams.filter(t => t.id === 3)[0];
      this.teamB = this.teams.filter(t => t.id === 1)[0];
      this.goToScoreCard();
    }
  }


  ///////////////// Stepper ////////////////////////
  newMatch() {
    if (this.weekSelected && this.formatSelected && this.courseSelected) {
      this.match = new Match(this.weekSelected.number, this.formatSelected, this.courseSelected.frontNine);
    } else {
      console.log('cannot create new match)');
    }
    console.log('match:', this.match);
  }

  goToScoreCard() {
    this.showScoreCard = true;
    if (this.match.teamOne.roundA.matchStrokes !== this.match.teamOne.roundA.strokesGetting) {
      this.showMatchScoreInputs = true;
    }
  }

  onStepperChange(event) {
    if (event.selectedIndex === 3 && !this.match) {
      this.newMatch();
    }
  }

  setStrokes(stackStrokes: boolean, team, round, event) {
    if (stackStrokes) {
      this.match[team][round].strokesGetting = parseInt(event.target.value, 10);
    } else {
      this.match[team][round].matchStrokes = parseInt(event.target.value, 10);
    }
  }

  onWeekChange(week) {
    if (this.match) {
      this.match.week = week.value;
    }
  }

  onFormatChange(format) {
    if (this.match) {
      this.match.format = format.value;
    }
  }

  onCourseChange(course) {
    if (this.match) {
      this.match.course = course.value;
    }
  }

  openWeekModal() {
    this.dialog.open(WeekModalComponent);
  }

  ///////////////// Stepper ////////////////////////


  /////////////// Score Card //////////////////////

  addScorePlayer(team, round, hole, event) {
    this.match[team][round].scores[hole] = parseInt(event.target.value, 10);
    this.match[team][round].total = Object.values(this.match[team][round].scores).reduce((a, b) => a + b);
    //this.determineNetScore(team, hole);
  }

  addNetScore(team, hole, event) {
    let score = parseInt(event.target.value, 10);
    this.match[team].netScores[hole] = score;
    this.match[team].netTotal = Object.values(this.match[team].netScores).reduce((a, b) => a + b);
    if (this.match[team].roundA.matchStrokes === this.match[team].roundA.strokesGetting) {
      this._addMatchScore(team, hole, score);
    }
  }

  addMatchScore(team, hole, event) {
    this.match[team].matchScores[hole] = parseInt(event.target.value, 10);
    this.match[team].matchTotal = Object.values(this.match[team].matchScores).reduce((a, b) => a + b);
  }

  determineMatchScore(team, round, hole) {
    if (this.match[team][round].matchStrokes !== this.match[team][round].strokesGetting) {
      let strokes = this.getMatchStrokes(this.match[team][round].matchStrokes, hole);
      this._addMatchScore(team, round, this.match[team][round].netScores[hole] - strokes);
    } else {
      this._addMatchScore(team, round, this.match[team][round].netScores[hole]);
    }
  }


  _addMatchScore(team, hole, score) {
    this.match[team].matchScores[hole] = score;
    this.match[team].matchTotal = Object.values(this.match[team].matchScores).reduce((a, b) => a + b);
  }

  numStrokes(strokes, i) {
    if (strokes > 0) {
      if (strokes > 9) {
        let unFuckingBelievable = strokes - 9;
        return unFuckingBelievable >= this.match.course.holes[i].stroke ? [1, 2] : [1];
      } else {
        return strokes >= this.match.course.holes[i].stroke ? [1] : [];
      }
    }
  }

  getMatchStrokes(strokes, hole): number {
    if (strokes > 0) {
      if (strokes > 9) {
        let unFuckingBelievable = strokes - 9;
        return unFuckingBelievable >= this.match.course.holes[hole].stroke ? 2 : 1;
      } else {
        return strokes >= this.match.course.holes[hole].stroke ? 1 : 0;
      }
    }
  }


  scoreClass(score: number, i) {
    const par = this.match.course.holes[i].par;
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

  determineMatch() {
    let a = 0, b = 0;
    for (let i = 1; i <= 9; i++) {
      let scoreA = this.match.teamOne.matchScores[i];
      let scoreB = this.match.teamTwo.matchScores[i];
      if (scoreA < scoreB) {
        a++;
      } else if (scoreA > scoreB) {
        b++;
      }
    }

    if (a === b) {
      return 'Tie';
    } else if (a > b) {
      let playerA = this.match.teamOne.roundA.playerA.displayName;
      let playerB = this.match.teamOne.roundB ? this.match.teamOne.roundB.playerA.displayName
        : this.match.teamOne.roundA.playerB.displayName;
      return `${playerA} & ${playerB} <br> win ${a - b} up`;
    } else if (a < b) {
      let playerA = this.match.teamTwo.roundA.playerA.displayName;
      let playerB = this.match.teamTwo.roundB ? this.match.teamTwo.roundB.playerA.displayName
        : this.match.teamTwo.roundA.playerB.displayName;
      return `${playerA} & ${playerB} <br> win ${b - a} up`;
    }
  }


  /////////////// Score Card //////////////////////

  ////////////////////////////////////////////////////////////////////////////


  /*


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
   */

}
