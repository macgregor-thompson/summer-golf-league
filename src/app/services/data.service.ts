import { Injectable } from '@angular/core';
import { Golfer } from '../models/golfer';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  constructor(private fireStore: AngularFirestore) { }

  getGolfers() {
  }

}
