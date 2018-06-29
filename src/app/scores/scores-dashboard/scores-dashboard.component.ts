import { Component, OnInit } from '@angular/core';
import { Golfer } from '../../models/interfaces/golfer';
import { Round } from '../../models/interfaces/round';
import { Week } from '../../models/interfaces/week';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { PlayerService } from '../../core/services/player.service';
import { MatDialog } from '@angular/material';
import { WeekModalComponent } from '../week-modal/week-modal.component';
import { Team } from '../../models/interfaces/team';
import { Match } from '../../models/interfaces/match';
import { Course } from '../../models/interfaces/course';
import { PlayerName } from '../../models/classes/player-name';
import { FormatName } from '../../models/classes/format-name';

@Component({
  selector: 'app-scores-dashboard',
  templateUrl: './scores-dashboard.component.html',
  styleUrls: ['./scores-dashboard.component.scss']
})
export class ScoresDashboardComponent implements OnInit {

  roundsCollection: AngularFirestoreCollection<Round>;
  //playerName = PlayerName;
  formatName = FormatName;
  course: Course;
  golfers: Golfer[];
  matches: Match[];
  rounds: Round[];
  teams: Team[];
  step = 0;
  weekSelected: Week;
  weeks: Week[];
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
    this.afs.collection<Golfer>('members').valueChanges().subscribe((data: Golfer[]) => this.golfers = data);
    this.roundsCollection = this.afs.collection<Round>('rounds'); // This gets passed down to the scorecards to use
    this.afs.collection<Team>('teams').valueChanges().subscribe((data: Team[]) => this.teams = data);
  }

  getWeeks() {
    this.afs.collection<Week>('weeks', ref => ref.orderBy('number')).valueChanges()
      .subscribe((data: Week[]) => {
        this.weeks = data;
        this.setWeek(data.filter((week: Week) => week.number === data.length)[0]);
      });
  }

  setWeek(week: Week) {
    this.weekSelected = week;
    this.getCourseByWeek(week);
    this.getMatchesByWeek(week);
  }

  getMatchesByWeek(week: Week) {
    this.afs.collection<Match>('matches', ref => ref.where('week', '==', week.number)).valueChanges()
      .subscribe((data: Match[]) => {
        this.matches = data;
      });
  }

  getCourseByWeek(week: Week) {
    this.afs.collection<Course>('courses').doc<Course>(week.courseId).valueChanges()
      .subscribe((data: Course) => this.course = data);
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
