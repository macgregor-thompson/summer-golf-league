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
import { DataService } from '../../core/services/data.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

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
  individualScores = true;
  matchData: MatTableDataSource<IMatch>;
  displayedColumns = ['players', 'netScore', 'stackPoints', 'matchPoints', 'totalPoints', 'individualPoints', 'team'];
  fourPersonScrambleColumns = ['teamPlayers', 'teamScore', 'stackPoints', 'teamName'];
  weeklyMatches = [];


  constructor(private ds: DataService,
              private afs: AngularFirestore,
              public playerService: PlayerService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getWeeks(); //get's matches after setting week
    this.ds.members().subscribe((data: IGolfer[]) => this.golfers = data);
    this.ds.teams().subscribe((data: Team[]) => {
      this.teams = data.filter(team => team.id < 4);
    });
  }

  logStuff() {
    console.log('matches:', this.matches);
    console.log('weeklyMatches:', this.weeklyMatches);
    //let newDoc = this.afs.createId();
    //console.log(newDoc);
  }

  toggleIndividualScores(e) {
    e.stopPropagation();
    this.individualScores = !this.individualScores;
  }

  getWeeks() {
    this.ds.weeks().subscribe((data: IWeek[]) => {
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
    // this won't work from ds.matchesByWeek() for some reason...
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

  addPoints() {
    this.addPlayerPoints();
    this.addTeamPoints();
  }

  addTeamPoints() {
    this.teams.forEach(team => {
      team.weeklyPoints[this.weekSelected.number] = 0;
    });

    this.weeklyMatches.forEach((match, i) => {
      let points = match.matchPoints ? match.matchPoints + match.stackPoints : match.stackPoints;
      let team = this.teams.filter(t => t.id === match.team.id)[0];
      team.weeklyPoints[this.weekSelected.number] += points;
    });

    this.teams.forEach(team => {
      let totalPoints = Object.values(team.weeklyPoints).reduce((a, b) => a + b);
      let pointsArr = Object.keys(team.weeklyPoints).map( key => team.weeklyPoints[key]);
      let worstWeek = Math.min.apply(null, pointsArr);
      let netPoints = totalPoints - worstWeek;
      console.log(team.name, totalPoints, worstWeek, netPoints);
      this.ds.teamsCollection().doc(team.docId).update(
        {
          weeklyPoints: team.weeklyPoints,
          points: totalPoints,
          netPoints: netPoints
        })
        .then(data => {
          console.log('successfully added team weekly points:', data);
        }).catch(error => console.log('error adding team weekly points:', error));
    });

  }


  addPlayerPoints() {
    let didNotShow = this.golfers.slice();
    let showedUp = [];
    this.weeklyMatches.forEach((match, i) => {
      let points;
      if (this.matches[0].format !== Format.FourManScramble) {
        points = (match.stackPoints + match.matchPoints) / 2;
      } else {
        points = match.stackPoints / 4;
      }
      if (match.playerA.teamId < 4) {
        showedUp.push(match.playerA);
        this._addPlayerPointsToAFS(this.golfers.filter(golfer => golfer.id === match.playerA.id)[0], points);
      } else {
        console.log(`${match.playerA.displayName} is not a member.`);
      }
      if (match.playerB.teamId < 4) {
        showedUp.push(match.playerB);
        this._addPlayerPointsToAFS(this.golfers.filter(golfer => golfer.id === match.playerB.id)[0], points);
      } else {
        console.log(`${match.playerB.displayName} is not a member.`);
      }
      if (match.playerC) {
        if (match.playerC.teamId < 4) {
          showedUp.push(match.playerC);
          this._addPlayerPointsToAFS(this.golfers.filter(golfer => golfer.id === match.playerC.id)[0], points);
        } else {
          console.log(`${match.playerC.displayName} is not a member.`);
        }
      }
      if (match.playerD) {
        if (match.playerD.teamId < 4) {
          showedUp.push(match.playerD);
          this._addPlayerPointsToAFS(this.golfers.filter(golfer => golfer.id === match.playerD.id)[0], points);
        } else {
          console.log(`${match.playerD.displayName} is not a member.`);
        }
      }
    });
    showedUp.forEach(player => {
      let index = didNotShow.findIndex(el => player.id === el.id);
      if (index > -1) {
        didNotShow.splice(index, 1);
      }
    });
    console.log('showed up:', showedUp);
    console.log('did not show up:', didNotShow);
    didNotShow.forEach(fuckBag => {
      this._addPlayerPointsToAFS(fuckBag, 0);
    });
    console.log('finished adding points.', this.golfers);
  }

  _addPlayerPointsToAFS(golfer: IGolfer, points: number) {
    golfer.weeklyPoints[this.weekSelected.number] = points;
    let totalPoints = Object.values(golfer.weeklyPoints).reduce((a, b) => a + b);
    let pointsArr = Object.keys( golfer.weeklyPoints ).map( key => golfer.weeklyPoints[key]);
    let worstWeek = Math.min.apply(null, pointsArr);
    let netPoints = totalPoints - worstWeek;
    //console.log(golfer.displayName, totalPoints, worstWeek, netPoints);
    this.ds.membersCollection().doc(golfer.id).update(
      {
        weeklyPoints: golfer.weeklyPoints,
        points: totalPoints,
        netPoints: netPoints
      })
      .then(data => {
        console.log('successfully added player weekly points:', data);
      }).catch(error => console.log('error adding player weekly points:', error));
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
    matchesArr.sort(this.setOrder);
    this.matchData = new MatTableDataSource<IMatch>(matchesArr);
  }


  sortByNetTotal(a, b) {
    if (a.netTotal < b.netTotal)
      return -1;
    if (a.netTotal > b.netTotal)
      return 1;
    return 0;
  }

  setOrder(a, b) {
    if ((a.matchPoints + a.stackPoints) > (b.matchPoints + b.stackPoints))
      return -1;
    if ((a.matchPoints + a.stackPoints) < (b.matchPoints + b.stackPoints))
      return 1;
    return 0;
  }

  setStackPoints(arr) {
    this.weeklyMatches = arr.map((team, i) => {
      if (i > 0) {
        let prev = arr[i - 1];
        if (prev.netTotal === team.netTotal) {
          if (i > 1) {
            let twoBack = arr[i - 2];
            if (twoBack.netTotal === team.netTotal) {
              let points = ((6 - (i - 2)) + (6 - (i - 1)) + (6 - i)) / 3;
              team.stackPoints = points;
              prev.stackPoints = points;
              twoBack.stackPoints = points;
            } else {
              let points = ((6 - (i - 1)) + (6 - i)) / 2;
              team.stackPoints = points;
              prev.stackPoints = points;
            }
          } else {
            let points = ((6 - (i - 1)) + (6 - i)) / 2;
            team.stackPoints = points;
            prev.stackPoints = points;
          }

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

  launchPictureModal(match, e) {
    e.stopPropagation();
    this.dialog.open(ScorecardModalComponent, {
      data: match
    });
  }


}

export interface IMatchId extends IMatch { id: string; }

