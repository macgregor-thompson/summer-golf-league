import { Component, OnInit } from '@angular/core';

import { MockDataService } from '../../services/mock-data.service';
import { Course } from '../../models/course';
import { Golfer } from '../../models/golfer';
import { LeagueStatus } from '../../models/league-status.enum';
import { Score } from '../../models/score';
import { HolesPlayed } from '../../models/holes-played.enum';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  courses: Course[];
  golfers: Golfer[];
  members: Golfer[];
  substitutes: Golfer[];
  HolesPlayed = HolesPlayed;

  constructor(private mockDataService: MockDataService) { }

  ngOnInit() {
    this.getCourses();
    this.getGolfers();
    }

  getCourses() {
    this.mockDataService.getCourses()
      .subscribe((data: Course[]) => this.courses = data);
  }

  getGolfers() {
    this.mockDataService.getGolfers()
      .subscribe((data: Golfer[]) => {
        this.golfers = data;
        this.members = data.filter((golfer: Golfer) => golfer.leagueStatus === LeagueStatus.Member);
        this.substitutes = data.filter((golfer: Golfer) => golfer.leagueStatus === LeagueStatus.Substitute);
      });
  }


}
