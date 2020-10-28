import { Component, OnInit } from '@angular/core';
import {AuthApiService} from "../../services/auth-api.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  type: string;
  loginFormCollector = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private authApiService: AuthApiService, public router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log("ngOnInit: LoginPage");
    this.type = 'collector';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  onLoginCollector() {
    let promise = this.authApiService.login(0, this.loginFormCollector.get('email').value, this.loginFormCollector.get('password').value);
    promise.then((response)=>{
      if (response.status == 200) {
        console.log(response.body['token']);
        console.log("joHO");
        localStorage.setItem('token', response.body['token']);
        this.router.navigate(['app-root']);
      }
    }).catch((error)=>{
      if (error.status == 401) {
        console.log('wrong login credentials');
      }
    });
  }

  navRegisterCollector() {
    this.router.navigate(['registration-collector'])
  }
}
