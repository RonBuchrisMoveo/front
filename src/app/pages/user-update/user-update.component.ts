import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { UserPageComponent } from '../user-page/user-page.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  public users: any
  public user: any={} as User

  public userUpdated: any = {
    _id:'',
    name: '',
    email: '',
    phone: '',
  }

  constructor(private router:Router,private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.userService.query().subscribe((data) => {
      this.users = data;
      this.activatedRoute.paramMap.subscribe(params => {
          const id:string|null= params.get('id')
          const currUser:any = userService.getUserById(id,this.users)
          this.user=currUser
          });
          this.userUpdated={
            _id:this.user._id,
            name: this.user.name,
            email: this.user.email,
            phone: this.user.phone,
          }
          
    });
    }

    updateUser=()=>{
      this.userService.updateUser(this.userUpdated).subscribe((data)=>{
        const idx = this.users.findIndex((user:any) =>
        user._id === data._id
      );
      this.users.splice(idx,1,data)
      })
      this.router.navigate(['/contact'])
    }
}
