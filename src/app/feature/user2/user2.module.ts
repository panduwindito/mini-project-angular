import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {UserService} from "../../service/user.service";



@NgModule({
  declarations: [UserPageComponent],
  imports: [CommonModule],
  providers:[UserService],
  exports: [UserPageComponent]
})
export class User2Module { }
