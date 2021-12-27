import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  private BASE_URL = '//localhost:3030/api/'

  public async login(user: any) {
    try {
      const loggedinUser = await this.http.post(this.BASE_URL + 'auth/login', user).toPromise()
      sessionStorage.setItem('loggedinUser', JSON.stringify(loggedinUser))
      return loggedinUser
    } catch (err) {
      throw err
    }
  }

  public signUp(user: any) {
    console.log(`user`, user)
    // const loggedinUser = this.http.post(this.ROOT_URL + '/auth/signup', user).toPromise()
    const loggedinUser = this.http.post(this.BASE_URL + 'auth/signup', user).toPromise()
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return loggedinUser
  }

  // public getLoggedinUser() {
  //   return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
  // }

  // public logout() {
  //   sessionStorage.removeItem('loggedinUser')
  //   location.reload();
  // }

  // public validateEmail(email: string | any[]) {
  //   if (email.length > 26) return false
    
  //   const emailType = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return emailType.test(String(email).toLowerCase());
  // }

  // public validateUsername(username: string | any[]) {
  //   console.log('username.length', username.length)
  //   if (!username || username.length > 10) return false
  //   return true
  // }


  // public _saveToStorage(key: string, value: any) {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }

  // public _loadFromStorage(key: string) {
  //   let data = localStorage.getItem(key);
  //   return (data) ? JSON.parse(data) : undefined;
  // }
}
