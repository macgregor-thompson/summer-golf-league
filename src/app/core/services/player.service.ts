import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class PlayerService {

  constructor(public afAuth: AngularFireAuth) { }

  loginWithGitHub() {
    let provider = new firebase.auth.GithubAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(data => {
      console.log('signed in with github:', data);
    }).catch(e => {
      console.log('error logging in via github', e);
    });
  }


  logout() {
    this.afAuth.auth.signOut().then(data => {
      console.log('signed out:', data);
    }).catch(e => {
      console.log('error logging out:', e);
    });
  }

}
