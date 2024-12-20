import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {selectCartItemCount} from "../../state/cart/cart.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean;
  cartItemCount$: Observable<number>;
  constructor(private authService: AuthService, private router: Router, private store: Store) {
    this.isLogin = !!this.authService.getUser();
    this.cartItemCount$ = this.store.select(selectCartItemCount);
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
