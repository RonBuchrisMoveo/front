import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent {
 public users:any
 public admin:Boolean=false
  constructor(private userService:UserService,private cookie:CookieService,private router:Router) {
    this.userService.query().subscribe((data)=> {
      this.users = data;
    });
    let isAdmin:any = this.cookie.get('user-isAdmin')
    if(isAdmin==='true') this.admin =true
    else this.admin=false
   }

   onDelete=(userId:string)=>{
     this.userService.deleteUser(userId).subscribe((data)=>{
       this.users = data
     })
   }
   onUpdate=(userId:string)=>{
   this.router.navigate([`/update/${userId}`])
   }
}
