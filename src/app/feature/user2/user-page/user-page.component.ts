import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
  standalone: false
})
export class UserPageComponent implements OnInit {
  data: any;

  constructor(private userService: UserService) {}

  ngOnInit(){
    this.data = this.userService.getData();
  }

}
