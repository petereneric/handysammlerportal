import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthApiService} from "./auth-api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private authApiService: AuthApiService, public router: Router) {
    }

    canActivate(r): Promise<boolean> {
        console.log("hier haut er raus");
        //var currentUser = JSON.parse(localStorage.getItem('token'));
        //var token = currentUser.token;
        return new Promise((resolve) => {
            this.authApiService.authenticate().then((response) => {
                localStorage.setItem('token', response.body['token']);
                console.log('AuthGuard passed');
                resolve(true);
            }).catch((error) => {
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
