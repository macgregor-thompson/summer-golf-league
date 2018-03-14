import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Golfer } from '../models/golfer';

@Injectable()
export class GolfersService {
  golfersCollection: AngularFirestoreCollection<Golfer>;
  golfers: Observable<Golfer[]>;

  constructor(public afs: AngularFirestore) {
    this.golfersCollection = afs.collection<Golfer>('golfers');

  }

}
