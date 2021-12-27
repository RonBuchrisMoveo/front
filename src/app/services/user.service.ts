import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of,throwError } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../services/util.service';

const BASE_URL ='//localhost:3030/api/'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient ,private utilService: UtilService) {}

  //mock the server
  private _usersDb: User[] = [];

  private _users$ = new BehaviorSubject<User[]>([]);
  public users$ = this._users$.asObservable();

  private _filterBy$ = new BehaviorSubject({ term: '' });
  public filterBy$ = this._filterBy$.asObservable();

  public query():Observable<any> {
      return this.http.get<any>(`${BASE_URL}user`)
  }

  public getUserById(id: string): Observable<User> {
    //mock the server work
    const user = this._usersDb.find((user) => user._id === id);

    //return an observable
    return user
      ? of({ ...user })
      : throwError(`User id ${id} not found!`);
  }

  public deleteUser(id: string) {
    //mock the server work
    this._usersDb = this._usersDb.filter((user) => user._id !== id);

    // change the observable data in the service - let all the subscribers know
    this._users$.next(this._usersDb);
  }

  public saveUser(user: User) {
    return user._id
      ? this._updateUser(user)
      : this._addUser(user);
  }

  private _updateUser(user: User) {
    //mock the server work
    this._usersDb = this._usersDb.map((c) =>
      user._id === c._id ? user : c
    );
    // change the observable data in the service - let all the subscribers know
    this._users$.next(this._usersDb);
    return of({})
  }
  
  private _addUser(user: User) {
    const newUser: User = { ...user };
    newUser._id = this.utilService.makeId();
    this._usersDb.push(newUser);
    this._users$.next(this._usersDb);
    return of({})
  }

}
