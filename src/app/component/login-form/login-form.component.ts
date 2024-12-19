import { Component } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {RealtimeDatabaseService} from "../../service/realtime-database.service";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
  standalone: false
})
export class LoginFormComponent {
  isLogin: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
  }

  registerForm = this.formBuilder.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  async submit(){
    if(this.isLogin){
      await this.authService.login(this.registerForm.controls.email.value!!, this.registerForm.controls.password.value!!)
      this.router.navigate(['/submission'])
    }else{
      await this.authService.register(this.registerForm.controls.email.value!!, this.registerForm.controls.password.value!!)
      this.formBuilder
      this.isLogin = true;
    }
  }

  changeLogin(){
    this.isLogin = true
  }
  changeRegister(){
    this.isLogin = false
  }

}
