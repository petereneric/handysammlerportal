import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthApiService} from '../services/auth-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    type: string;
    loginFormCollector = this.fb.group({
    email: [''],
    password: ['']
  });

  constructor(private authApiService: AuthApiService, public router: Router,private fb: FormBuilder) {}

  ngOnInit(): void {
    this.type = 'collector';
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  onLoginCollector() {
      let promise = this.authApiService.login(0, this.loginFormCollector.get('eMail').value, this.loginFormCollector.get('password').value);
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
}
