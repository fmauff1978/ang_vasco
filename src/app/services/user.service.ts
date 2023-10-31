import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import { UserRole } from '../model/user-role';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn$ : Observable<boolean>;

  isLoggedOut$: Observable<boolean>;

  pictureUrl$: Observable<string>;

  roles$ : Observable<UserRole>;


  constructor( private afAuth: AngularFireAuth,private router: Router) {


      this.isLoggedIn$ = afAuth.authState.pipe(map(user => !!user));

      this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

      this.pictureUrl$ =
          afAuth.authState.pipe(map(user => user? user.photoURL : null));

      this.roles$ = this.afAuth.idTokenResult
          .pipe(
              map(token => <any>token?.claims ?? {admin:false})
             )

             console.log(this.roles$)}



logout() {
  this.afAuth.signOut();
  this.router.navigateByUrl('/login');
}
}
