import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { config } from '../config/config';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();


  }

  
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    console.log(username + password);
   return this.http.post<any>(config.PAPYRUS+ `/users/authenticate`, { username, password })
     .pipe(map(user => {
       // login successfull if there is a jwt token in the response
       if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         this.currentUserSubject.next(user);
       }

       return user;
     }));
  }

  register(userParam): Observable<any> {
    //methin thamai call karala thiyenne back end ekata 
          console.log (userParam );
          return this.http.post<any>(config.PAPYRUS+`/users/register`, userParam)
          .pipe(map(user => {
            // register successfull if there is a jwt token in the response
            return user;
          }));
       }
      }
