import { Component, OnInit } from '@angular/core';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { IRound } from '../../models/interfaces/i-round';
import { IWeek } from '../../models/interfaces/i-week';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PlayerService } from '../../core/services/player.service';
import { MatDialog } from '@angular/material';
import { WeekModalComponent } from '../week-modal/week-modal.component';
import { Team } from '../../models/interfaces/team';
import { IMatch } from '../../models/interfaces/i-match';
import { ICourse } from '../../models/interfaces/i-course';
import { PlayerName } from '../../models/classes/player-name';
import { FormatName } from '../../models/classes/format-name';
import { Week } from '../../models/classes/week';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {

  roundsCollection: AngularFirestoreCollection<IRound>;
  //playerName = PlayerName;
  formatName = FormatName;
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


  constructor(private afs: AngularFirestore,
              public playerService: PlayerService,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.getWeeks();
    this.afs.collection<IGolfer>('members').valueChanges().subscribe((data: IGolfer[]) => this.golfers = data);
    this.roundsCollection = this.afs.collection<IRound>('rounds'); // This gets passed down to the scorecards to use
    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => this.teams = data);
  }

  logStuff() {
    console.log('matches:', this.matches);
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
  }

  getMatchesByWeek(week: IWeek) {
    this.afs.collection<IMatch>('matches', ref => ref.where('week', '==', week.number)).valueChanges()
      .subscribe((data: IMatch[]) => {
        this.matches = data;
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


}
