import { Component, OnInit } from '@angular/core';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { IRound } from '../../models/interfaces/i-round';
import { IWeek } from '../../models/interfaces/i-week';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PlayerService } from '../../core/services/player.service';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { WeekModalComponent } from '../week-modal/week-modal.component';
import { Team } from '../../models/interfaces/team';
import { IMatch } from '../../models/interfaces/i-match';
import { ICourse } from '../../models/interfaces/i-course';
import { PlayerName } from '../../models/classes/player-name';
import { FormatName } from '../../models/classes/format-name';
import { Week } from '../../models/classes/week';
import { Format } from '../../models/enums/format.enum';
import { ScorecardModalComponent } from '../scorecard-modal/scorecard-modal.component';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {

  roundsCollection: AngularFirestoreCollection<IRound>;
  formatName = FormatName;
  Format = Format;
  course: ICourse;
  golfers: IGolfer[];
  matches: IMatch[];
  rounds: IRound[];
  teams: Team[];
  step = 0;
  weekSelected: IWeek;
  weeks: IWeek[];
  spinner = false;
  teamColor = {
    1: '#f44336', // MacGregor's team
    2: '#2196f3', // Warbird's team
    3: '#43a047' // GanMan's team
  };
  individualScores = false;
  matchData: MatTableDataSource<IMatch>;
  displayedColumns = ['players', 'netScore', 'stackPoints', 'matchPoints', 'totalPoints', 'team'];
  fourPersonScrambleColumns = ['teamPlayers', 'teamScore', 'stackPoints', 'teamName'];
  weeklyMatches = [];


  constructor(private afs: AngularFirestore,
              public playerService: PlayerService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getWeeks(); //get's matches after setting week
    this.afs.collection<IGolfer>('members').valueChanges().subscribe((data: IGolfer[]) => this.golfers = data);
    this.roundsCollection = this.afs.collection<IRound>('rounds'); // This gets passed down to the scorecards to use
    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => this.teams = data);
  }

  logStuff() {
    console.log('matches:', this.matches);
    console.log('weeklyMatches:', this.weeklyMatches);
  }

  toggleIndividualScores() {
    this.individualScores = !this.individualScores;
  }

  getWeeks() {
    this.afs.collection<IWeek>('weeks', ref => ref.orderBy('number')).valueChanges()
      .subscribe((data: IWeek[]) => {
        this.weeks = data;
        this.setWeek(data.filter((week: IWeek) => week.number === data.length)[0]);
      });
  }

  setWeek(week: IWeek) {
    this.weekSelected = week;
    this.getCourseByWeek(week);
    this.getMatchesByWeek(week);
    this.step = 0;
  }

  getMatchesByWeek(week: IWeek) {
    this.matches = null;
    this.afs.collection<IMatch>('matches', ref => ref.where('week', '==', week.number)).valueChanges()
      .subscribe((data: IMatch[]) => {
        this.matches = data;
        if (this.matches[0].format !== Format.FourManScramble) {
          this.determineMatchPoints();
        } else {
          this.determineTeamScramble();
        }
      });
  }


determineTeamScramble() {
  let matchesArr = [];
  this.matches.forEach((match) => {
    let teamA = {
      team: match.teamOne.team,
      playerA: match.teamOne.roundA.playerA,
      playerB: match.teamOne.roundA.playerB,
      playerC: match.teamOne.roundA.playerC,
      playerD: match.teamOne.roundA.playerD,
      stackPoints: 0,
      total: match.teamOne.roundA.total,
    };
    let teamB = {
      team: match.teamTwo.team,
      playerA: match.teamTwo.roundA.playerA,
      playerB: match.teamTwo.roundA.playerB,
      playerC: match.teamTwo.roundA.playerC,
      playerD: match.teamTwo.roundA.playerD,
      stackPoints: 0,
      total: match.teamTwo.roundA.total,
    };
    let teamC = {
      team: match.teamThree.team,
      playerA: match.teamThree.roundA.playerA,
      playerB: match.teamThree.roundA.playerB,
      playerC: match.teamThree.roundA.playerC,
      playerD: match.teamThree.roundA.playerD,
      stackPoints: 0,
      total: match.teamThree.roundA.total,
    };
    matchesArr.push(teamA);
    matchesArr.push(teamB);
    matchesArr.push(teamC);
    matchesArr.sort((a, b) => {
      if (a.total < b.total)
        return -1;
      if (a.total > b.total)
        return 1;
      return 0;
    });
    this.weeklyMatches = matchesArr.map((team, i) => {
      if (i > 0) {
        let prev = matchesArr[i - 1];
        if (prev.total === team.total) {
          let points = ((12 - ((i - 1) * 4)) + (12 - (i * 4)) / 2);
          team.stackPoints = points;
          prev.stackPoints = points;
        } else {
          team.stackPoints = 12 - (i * 4);
        }
      } else {
        team.stackPoints = 12;
      }
      return team;
    });
    this.matchData = new MatTableDataSource<IMatch>(this.weeklyMatches);
  });
}


  determineMatchPoints() {
    let matchesArr = [];
    this.matches.forEach((match, i) => {
      let teamA = {
        team: match.teamOne.team,
        stackPoints: 0,
        matchPoints: 0,
        playerA: match.teamOne.roundA.playerA,
        playerB: match.teamOne.roundB ? match.teamOne.roundB.playerA : match.teamOne.roundA.playerB,
        netTotal: match.teamOne.netTotal,
      };
      let teamB = {
        team: match.teamTwo.team,
        stackPoints: 0,
        matchPoints: 0,
        playerA: match.teamTwo.roundA.playerA,
        playerB: match.teamTwo.roundB ? match.teamTwo.roundB.playerA : match.teamTwo.roundA.playerB,
        netTotal: match.teamTwo.netTotal
      };
      if (match.winner === 1) {
        teamA.matchPoints = 1;
      } else if (match.winner === 2) {
        teamB.matchPoints = 1;
      } else {
        teamA.matchPoints = 0.5;
        teamB.matchPoints = 0.5;
      }
      matchesArr.push(teamA);
      matchesArr.push(teamB);
    });
    matchesArr.sort(this.sortByNetTotal);
    this.setStackPoints(matchesArr);
    this.matchData = new MatTableDataSource<IMatch>(this.weeklyMatches);
  }


  sortByNetTotal(a, b) {
    if (a.netTotal < b.netTotal)
      return -1;
    if (a.netTotal > b.netTotal)
      return 1;
    return 0;
  }

  setStackPoints(arr) {
    this.weeklyMatches = arr.map((team, i) => {
      if (i > 0) {
        let prev = arr[i - 1];
        if (prev.netTotal === team.netTotal) {
          let points = ((6 - (i - 1)) + (6 - i)) / 2;
          team.stackPoints = points;
          prev.stackPoints = points;
        } else {
          team.stackPoints = 6 - i;
        }
      } else {
        team.stackPoints = 6;
      }
      return team;
    });
  }

  getCourseByWeek(week: IWeek) {
    this.afs.collection<ICourse>('courses').doc<ICourse>(week.courseId).valueChanges()
      .subscribe((data: ICourse) => this.course = data);
  }

  filterTeam(teamId: number) {
    return this.teams.filter((team: Team) => team.id === teamId)[0];
  }

  onWeekChange(event) {
    if (event.value.number !== this.weekSelected.number) {
      this.setWeek(event.value);
    }
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openWeekModal() {
    this.dialog.open(WeekModalComponent);
  }

  launchPictureModal(match) {
    this.dialog.open(ScorecardModalComponent, {
      data: match
    });
  }


}
