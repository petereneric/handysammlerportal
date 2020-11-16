import { Component, OnInit } from '@angular/core';
import {AuthApiService} from "../../services/auth-api.service";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ConnApiService} from "../../services/conn-api.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit{
  type: number;
  loginFormCollector = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private authApiService: AuthApiService, private connApiService: ConnApiService, public router: Router,private fb: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    console.log("ngOnInit: LoginPage");
    this.type = 1;
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
    this.data.changeRole(ev['detail']['value']);
  }

  private login(role: number) {
    let data = {'role' : role, 'email' : this.loginFormCollector.get('email').value, 'password' : this.loginFormCollector.get('password').value};
    let promise = this.connApiService.post(ConnApiService.postLogin, data);
    //let promise = this.authApiService.login(0, this.loginFormCollector.get('email').value, this.loginFormCollector.get('password').value);
    promise.then((response)=>{
      if (response.status == 200) {
        // Save token
        localStorage.setItem('token', response.body['token']);

        // Navigate
        this.router.navigate(['app-root']);
      }
    }).catch((error)=>{
      if (error.status == 401) {
        console.log('wrong login credentials');
      }
    });
  }

  onLoginCollector() {
    this.login(0);
  }

  onLoginPartner() {
    this.login(1);
  }

  navRegisterCollector() {
    this.router.navigate(['registration-collector'])
  }

  onResetPassword() {
    this.router.navigate(['reset-password']);
  }
}
