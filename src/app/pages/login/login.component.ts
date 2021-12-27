import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'

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

  constructor(private auth: AuthService) { }

  loginToggle(txt: string) {
    if (txt === 'signup') this.isSignUp = true
    else this.isSignUp = false
  }

  userLogin() {
    const user = this.user
    if (this.isSignUp) {
      const u = this.auth.signUp(user)
    } else {
      this.auth.login(user)
    }
  }
}
