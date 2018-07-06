import {Component, OnInit} from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import {MockDataService} from '../../core/services/mock-data.service';
import {ICourse} from '../../models/interfaces/i-course';
import {IGolfer} from '../../models/interfaces/i-golfer';
import {IRound} from '../../models/interfaces/i-round';
import {IWeek} from '../../models/interfaces/i-week';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss']
})
export class HomeDashboardComponent implements OnInit {
  courses: ICourse[];
  golfers: Observable<IGolfer[]>;
  rounds: IRound[];
  members: IGolfer[];
  substitutes: IGolfer[];
  step = 0;
  weekSelected: IWeek;
  weeklyTotals = {};
  weeklyNet = [];
  weeks: IWeek[];
  spinner = false;


  constructor(private afs: AngularFirestore,
              private mockDataService: MockDataService) {
  }

  icon = false;

  ngOnInit() {
   /* this.getWeeks();
    this.getCourses();
    this.getGolfers();
    //this.getAllScores();
    this.getScoresByWeek(2);*/
  }

 /* toggleIndicator() {
    this.icon = !this.icon;
  }

  getWeeks() {
    this.mockDataService.getWeeks()
      .subscribe((data: IWeek[]) => {
        this.weeks = data;
        this.weekSelected = data.filter((week: IWeek) => week.number === data.length)[0];
        console.log('weekSelected:', this.weekSelected);
      });
  }

  getCourses() {
    this.mockDataService.getCourses()
      .subscribe((data: ICourse[]) => this.courses = data);
  }

  getGolfers() {
    this.golfers = this.afs.collection<IGolfer>('members').valueChanges();
  }

  getAllScores() {
    this.mockDataService.getAllScores()
      .subscribe((data: IRound[]) => {
        this.rounds = data;
        data.forEach((round: IRound) => {
          this.weeklyTotals[round.golferId] = round.total;
        });
      });
  }

  getScoresByWeek(weekNum: number) {
    this.spinner = true;
    this.mockDataService.getScoresByWeek(weekNum)
      .subscribe((data: IRound[]) => {
        this.rounds = data;
        console.log('data2:', data);
        console.log(`IWeek ${weekNum} rounds: ${this.rounds}`);
        data.forEach((round: IRound) => {
          this.weeklyTotals[round.golferId] = round.total;
          this.weeklyNet[round.golferId] = round.total - round.courseHandicap;
        });
        this.spinner = false;
      }, err => this.spinner = false);
  }

  filterRound(golfer): IRound {
    return this.rounds.filter(round => round.golferId === golfer.id)[0];
  }

  onWeekChange(event) {
    if (event.value.number !== this.weekSelected.number) {
      this.weekSelected = event.value;
      this.getScoresByWeek(this.weekSelected.number);
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
*/

}
