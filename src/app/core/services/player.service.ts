import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PlayerService {


  constructor(public afAuth: AngularFireAuth) { }

  player(): Observable<any> {
    return this.afAuth.authState;
  }

  loginWithGitHub() {
    let provider = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(data => {
      console.log('signed in with github:', data);
    }).catch(e => {
      console.log('error logging in via github', e);
    });
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
