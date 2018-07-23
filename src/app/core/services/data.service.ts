import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IGolfer } from '../../models/interfaces/i-golfer';
import { Team } from '../../models/interfaces/team';
import { IWeek } from '../../models/interfaces/i-week';
import { IMatch } from '../../models/interfaces/i-match';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map } from 'rxjs/operators';
import { Player } from '../../models/classes/player';
import { Course } from '../../models/classes/course';
import { Week } from '../../models/classes/week';

@Injectable()
export class DataService {
  membersRef = this.afs.collection<IGolfer>('members').valueChanges();
  subsRef = this.afs.collection<IGolfer>('subs').valueChanges();

  constructor(private afs: AngularFirestore) {}


  members(): Observable<Player[]> {
    return this.afs.collection<Player>('members', ref => ref.orderBy('displayName')).valueChanges();
  }

  membersCollection(): AngularFirestoreCollection<IGolfer> {
    return this.afs.collection<IGolfer>('members');
  }

  //addWeeklyPoints(golferId: string) {}

  subs(): Observable<Player[]> {
    return this.afs.collection<Player>('subs', ref => ref.orderBy('displayName')).valueChanges();
  }

  allPlayers(): Observable<Player[]> {
    return combineLatest<Player[]>(this.membersRef, this.subsRef).pipe(
      map(arr => arr.reduce((acc, cur) => acc.concat(cur)))
    );
  }

  ////// Get rid of this one
  golfers(): Observable<IGolfer[]> {
    return this.afs.collection<IGolfer>('members').valueChanges();
  }

  teams(): Observable<Team[]> {
    return this.afs.collection<Team>('teams', ref => ref.orderBy('id')).valueChanges();
  }

  allTeams(): Observable<Team[]> {
    return this.afs.collection<Team>('teams', ref => ref.orderBy('id')).valueChanges();
  }

  teamsCollection(): AngularFirestoreCollection<Team> {
    return this.afs.collection<Team>('teams');
  }

  weeks(): Observable<IWeek[]> {
    return this.afs.collection<IWeek>('weeks', ref => ref.orderBy('number')).valueChanges();
  }

  weeksCollection(): AngularFirestoreCollection<IWeek> {
    return this.afs.collection<IWeek>('weeks');
  }

  courses(): Observable<Course[]> {
    return this.afs.collection<Course>('courses').valueChanges();
  }

  getMatch(id: string): Observable<IMatch> {
    return this.afs.collection<IMatch>('matches').doc<IMatch>(id).valueChanges();
  }

  matchesCollection(): AngularFirestoreCollection<IMatch> {
    return this.afs.collection<IMatch>('matches');
  }

}
