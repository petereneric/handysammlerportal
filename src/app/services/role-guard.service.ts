import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from "@angular/router";
import {AuthApiService} from "./auth-api.service";


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private authApiService: AuthApiService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log('rolllleGuard');
    let token = localStorage.getItem('token');
    const promise = this.authApiService.getRole(token);
    promise.then((response)=>{
      console.log(response);
      if (response.body['role'] == 0) {
        console.log('navigate to collector portal');
        this.router.navigate(['collector']);
      }
      if (response.body['role'] == 1) {
        this.router.navigate(['portal-partner-component']);
      }
      return true;
    }).catch((error)=>{
      if (error.status == 401) {
        console.log('Token invalid');
      }
      return false;
    });
    return false;
  }
}
