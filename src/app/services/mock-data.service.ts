import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { LeagueStatus } from '../models/league-status.enum';

@Injectable()
export class MockDataService {

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any> {
    return this.http
      .get('assets/mock-data/courses.json')
      .map((data: object) => data['courses']);
  }

  getCourse(courseId): Observable<any> {
    console.log('getting course with id:', courseId);
    //const id = parseInt(courseId, 10);
    return this.http
      .get('assets/mock-data/courses.json')
      .map((data: object) => data['courses'].filter(course => course.id == courseId));
  }

  getGolfers(): Observable<any> {
    return this.http
      .get('assets/mock-data/golfers.json')
      .map((data: object) => data['golfers']);
  }

  getMembers(): Observable<any> {
    return this.http
      .get('assets/mock-data/golfers.json')
      .map((data: object) => data['golfers'].filter(golfer => golfer.leagueStatus === LeagueStatus.Member));
  }

  getSubstitutes(): Observable<any> {
    return this.http
      .get('assets/mock-data/golfers.json')
      .map((data: object) => data['golfers'].filter(golfer => golfer.leagueStatus === LeagueStatus.Substitute));
  }

  getAllScores(): Observable<any> {
    return this.http
      .get('assets/mock-data/scores.json')
      .map((data: object) => data['scores']);
  }

  getScores(playerId: number): Observable<any> {
    return this.http
      .get('assets/mock-data/scores.json')
      .map((data: object) => data['scores'].filter(score => score.golferId === playerId));
  }

  getScore(scoreId): Observable<any> {
    console.log('getting score with id:', scoreId);
   //const id = parseInt(scoreId, 10);
    return this.http
      .get('assets/mock-data/scores.json')
      .map((data: object) => data['scores'].filter(score => score.id == scoreId));
  }


}
