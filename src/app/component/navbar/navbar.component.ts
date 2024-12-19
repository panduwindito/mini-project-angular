import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean;
  constructor(private authService: AuthService, private router: Router,) {
    this.isLogin = !!this.authService.getUser();
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
