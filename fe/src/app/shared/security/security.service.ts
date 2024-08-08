import { Injectable } from '@angular/core';
import { AppUserAuth } from '../models/app-user-auth.model';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user = new BehaviorSubject<AppUserAuth|null>(null);
  securityObject: AppUserAuth = new AppUserAuth();
  userIsLoggedIn: boolean = false;
  
  constructor(private userService: UserService, private router: Router) {
    this.user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!))
  }

  public get userValue() {
      return this.user.value;
  }

  login(user: User): Observable<AppUserAuth>{
    this.resetSecurityObject();   
   
    return this.userService.loginUser(user).pipe(
      tap(
        (user)=>{
          user = {
            username: user.username.toLocaleLowerCase(),
            displayName: user.displayName,
            password: user.password,
            _id: user._id,
            token: user.token,
            isAuthenticated: true
          };
          this.userIsLoggedIn = true;
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
         
        }        
      )

    ) 
  }

  checkLogin(): boolean{
    return !!this.userValue;
  }

  logout(): void{
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('user');
  }

  resetSecurityObject() {
    this.securityObject.username = '';
    this.securityObject.token = '';
    this.securityObject.isAuthenticated = false;

    localStorage.removeItem('barearerToken');
  }
}
