import {Injectable} from '@angular/core';
import {AsyncLocalStorage} from 'angular-async-local-storage';
import {Golfer} from '../../models/golfer';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class UserService {
  currentGolfer: Golfer;

  constructor(protected localStorage: AsyncLocalStorage) {
  }


  // TODO: Make this work where when you change or log out it will push that change to the subscribers of current golfer...


  getCurrentGolfer(): Observable<Golfer> {
    return this.localStorage.getItem('golfer');
  }

  setCurrentGolfer(golfer: Golfer): Observable<boolean> {
    return this.localStorage.setItem('golfer', golfer);
  }

  removeCurrentGolfer(): Observable<any> {
    return this.localStorage.removeItem('golfer');
  }

}
