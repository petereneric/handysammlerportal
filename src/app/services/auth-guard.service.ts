import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthApiService} from "./auth-api.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authApiService:AuthApiService, public router: Router) { }

  canActivate(r): Promise<boolean> {
    console.log("hier haut er raus");
    //var currentUser = JSON.parse(localStorage.getItem('token'));
    //var token = currentUser.token;
    return new Promise((resolve) => {
      this.authApiService.isTokenValid().then((response)=>{
        console.log('AuthGuard passed');
        console.log(response);
        if (response.body['tokenValid'] == 1) {
          console.log("joHOOOOOO");
          resolve(true);
        } else {
          resolve(false);
        }

      }).catch((error)=>{

        if (error.status == 401 || error.status == 440) {
          console.log('navigate to login');
          this.router.navigate(['login']);
          console.log(error);
        } else {
          console.log(error);
        }
        resolve(false);
      });
    })

    /*
    var currentUser = JSON.parse(localStorage.getItem('token'));
    var token = currentUser.token;
    const promise = this.authApiService.isTokenValid(token);
    promise.then((response)=>{
      console.log('AuthGuard passed');
      console.log(response);
      if (response.body['tokenValid'] == 1) {
        console.log("jo");
      }
      return (response.body['tokenValid'] == 1);
    }).catch((error)=>{
      if (error.status == 401) {
        console.log('navigate to login');
        this.router.navigate(['login-component']);
      } else {
        console.log(error);
      }
      return false;
    });
    return true;
    */
  }


}
