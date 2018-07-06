import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { IGolfer } from '../../models/interfaces/i-golfer';

@Injectable()
export class GolfersService {
  golfersCollection: AngularFirestoreCollection<IGolfer>;
  golfers: Observable<IGolfer[]>;

  constructor(public afs: AngularFirestore) {
    this.golfersCollection = afs.collection<IGolfer>('members');

  }

}
