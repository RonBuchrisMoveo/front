import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public user: any = {
    name: '',
    password: '',
    email: '',
    phone: '',
  }

  public isSignUp: boolean = false
  public islogin: boolean = false
  public username: string = ''

  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) { 
    const name= this.cookie.get('user-name')
    if(name){
      this.islogin = true
      this.username = name
    }
  }

  loginToggle(txt: string) {
    if (txt === 'signup') this.isSignUp = true
    else this.isSignUp = false
  }

  async userLogin() {
    const currUser = this.user
    if (this.isSignUp) {
      await this.auth.signUp(currUser)
    } else {
      const { token, user } = await this.auth.login(currUser)
      console.log(`user`, user)
      if (token) {
        console.log(`user`, user)
        this.cookie.set('user-token', token)
        this.cookie.set('user-name', user.name)
        this.cookie.set('user-isAdmin', user.isAdmin)
        this.username = user.name
        this.islogin = true
      }
    }
  }
onLogout =()=>{
  this.cookie.deleteAll()
  this.router.navigate(['/'])
}

}
