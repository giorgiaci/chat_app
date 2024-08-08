import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { AppUserAuth } from "./models/app-user-auth.model";
import { User } from "./models/user.model";

@Injectable({
    providedIn: 'root',
  })

export class UserService {
    constructor(private http: HttpClient){}

    getUsers(): Observable<AppUserAuth[]>{
      return this.http.get('http://localhost:3000/api/users').pipe(map((response: any) => response as AppUserAuth[]))
    }

    getUser(id: number): Observable<AppUserAuth>{
      return this.http.get(`http://localhost:3000/api/users/${id}`).pipe(map((response: any) => response as AppUserAuth))
      
    }

    loginUser(user:User): Observable<AppUserAuth>{      
      return this.http.post<any>('http://localhost:3000/api/user/login',  user ).pipe(map((response: any) => response as AppUserAuth));
    }
}