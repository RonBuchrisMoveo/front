import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
 public users:any
  constructor(private userService:UserService) {
    userService.query().subscribe((data)=> {
      this.users = data;
      console.log(data);
    });
   }

  ngOnInit(): void {
  }

}
