import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokemonService} from "../../service/pokemon.service";
import {LoginRoutingModule, } from "../../routing/login-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginFormComponent} from "../../component/login-form/login-form.component";



@NgModule({
  declarations: [
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    PokemonService
  ]
})
export class LoginModule { }
