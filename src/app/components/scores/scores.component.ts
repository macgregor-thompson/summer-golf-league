import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { MatTableDataSource } from '@angular/material';

import { Round } from '../../models/round';
import { MockDataService } from '../../services/mock-data.service';
import { Course } from '../../models/course';
import { SidePlayed } from '../../models/enums/side-played.enum';


@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: [ './scores.component.scss' ]
})
export class ScoresComponent implements OnInit {
  round: Round;
  dataSource: MatTableDataSource<Round>;
  course: Course;
  displayedColumns: string[] = [];

  //dataSource = new MatTableDataSource(...{...frontNine} = this.score.frontNine, );

  constructor(private router: Router,
              private route: ActivatedRoute,
              private mockDataService: MockDataService) { }

  ngOnInit() {
    this.route.params
      .switchMap((round: Round) => this.mockDataService.getScore(round.id))
      .subscribe(data => {
        //must return an array for the Mat Table
        console.log('data:', typeof data, data);
        this.round = data[0];
        this.dataSource = new MatTableDataSource(data);
        if (this.round.sidePlayed === SidePlayed.Front) {
          this.displayedColumns = ['hole', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'total'];
        } else {
          this.displayedColumns = ['hole', '10', '11', '12', '13', '14', '15', '16', '17', '18', 'total'];
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
