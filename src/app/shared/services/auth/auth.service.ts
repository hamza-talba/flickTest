import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import User from 'src/app/models/User.model';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  isLoggedIn:BehaviorSubject<boolean> = new BehaviorSubject(false)
  isLoggedIn$:Observable<boolean> = this.isLoggedIn.asObservable()
  constructor(
    public afs: AngularFirestore,    
    public afAuth: AngularFireAuth, 
    public router: Router,  
   ) {    
    localStorage.getItem('user')?this.isLoggedIn.next(true):this.isLoggedIn.next(false)
  }

   SignIn(email, password) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

   SignUp(email, password) {
    return this.afAuth.createUserWithEmailAndPassword(email, password) 
  }
 
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

   SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
     })
  }
}
