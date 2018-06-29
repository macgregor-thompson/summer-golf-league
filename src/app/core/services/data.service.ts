import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Golfer } from '../../models/interfaces/golfer';
import { Team } from '../../models/interfaces/team';
import { Week } from '../../models/interfaces/week';
import { MatchModel } from '../../models/classes/match-model';

@Injectable()
export class DataService {

  constructor(private afs: AngularFirestore) {}


  golfers(): Observable<Golfer[]> {
    return this.afs.collection<Golfer>('members').valueChanges();
  }

  teams(): Observable<Team[]> {
    return this.afs.collection<Team>('teams').valueChanges();
  }

  weeks(): Observable<Week[]> {
    return this.afs.collection<Week>('weeks').valueChanges();
  }

  newMatch(foo): MatchModel {
    return new MatchModel(foo);
  }

}
