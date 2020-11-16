import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from "@angular/router";
import {AuthApiService} from "./auth-api.service";
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authApiService: AuthApiService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {

    return new Promise((resolve) => {
      this.authApiService.authenticate().then((response) => {
        // Save token
        localStorage.setItem('token', response.body['token']);

        // Get role from token
        let token:string = response.body['token'];
        let tokenInfo = jwt_decode(token);
        let role = tokenInfo['role'];

        // Navigate
        if (role == 0) {
          console.log('navigate to collector portal');
          this.router.navigate(['collector']);
        }
        if (role == 1) {
          this.router.navigate(['portal-partner-component']);
        }

        // Return
        resolve(true);
      }).catch((error)=>{
        switch (error.status) {
          case 401:
          case 440:
            console.log('navigate to login');
            this.router.navigate(['login']);
            break;
          case 403:
            console.log("navigate to verify page");
            this.router.navigate(['verification']);
        }
        console.log(error);
        resolve(false);
      });
    })
  }
}
