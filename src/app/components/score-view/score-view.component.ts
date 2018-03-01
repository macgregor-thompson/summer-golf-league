import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { MatTableDataSource } from '@angular/material';

import { Score } from '../../models/score';
import { MockDataService } from '../../services/mock-data.service';
import { Course } from '../../models/course';


@Component({
  selector: 'app-score-view',
  templateUrl: './score-view.component.html',
  styleUrls: [ './score-view.component.scss' ]
})
export class ScoreViewComponent implements OnInit {
  score: Score;
  dataSource: MatTableDataSource<Score>;
  course: Course;

 /* displayedColumns = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', 'out',
    '10', '11', '12', '13', '14', '15', '16', '17', '18', 'in', 'total'
  ];*/

 frontNineColumns = [
   'hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'out'
 ];

 backNineColumns = [
   'hole', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'in'
 ];

  //dataSource = new MatTableDataSource(...{...frontNine} = this.score.frontNine, );

  constructor( private router: Router,
               private route: ActivatedRoute,
               private mockDataService: MockDataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((score: Score) => this.mockDataService.getScore(score.id))
      .subscribe(data => {
        //must return an array for the Mat Table
        console.log('data:', typeof data, data);
        this.score = data[0];
        this.dataSource = new MatTableDataSource(data);
        if (this.score.frontNine && this.score.backNine) {
          this.backNineColumns = this.backNineColumns.concat('total');
        }
        console.log('dataSource:', this.dataSource);
        this.mockDataService.getCourse(data[0].courseId)
          .subscribe((course: Course) => {
            this.course = course;
            console.log('course:', this.course);
          });
      });
  }

  goBack() {
    // this is called imperative routing because we're using the native api
    this.router.navigate(['']);
  }


}
