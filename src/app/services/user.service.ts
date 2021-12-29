import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../services/util.service';
import { CookieService } from 'ngx-cookie-service';

const BASE_URL ='http://localhost:3030/api/'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient ,private utilService: UtilService,private cookie:CookieService) {}

  //mock the server
  private _usersDb: User[] = [];

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _filterBy$ = new BehaviorSubject({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  public query():Observable<any> {
      return this.http.get<any>(`${BASE_URL}user`)
  }

  public getUserById(id: string|null,users:User[]){
    const user:any = users.find((user:any) => user._id === id);
    return user
  }

  public deleteUser(id: string):Observable<any> {
    const token:any = this.cookie.get('user-token')
    return this.http.delete<any>(`${BASE_URL}user/${id}`,{headers:{['authorization']:`Bearer ${token}`}})
  }
  
  public updateUser(updatedUser:any):Observable<any> {
    const token:any = this.cookie.get('user-token')
    return this.http.put<any>(`${BASE_URL}user/${updatedUser._id}`,updatedUser,{headers:{['authorization']:`Bearer ${token}`}})
  }
  
  private _addUser(user: User) {
    const newUser: User = { ...user };
    newUser._id = this.utilService.makeId();
    this._usersDb.push(newUser);
    this._users$.next(this._usersDb);
    return of({})
  }

}
