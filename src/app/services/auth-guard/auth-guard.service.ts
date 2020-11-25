import {Injectable} from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthApiService} from "../auth-api/auth-api.service";

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
            this.authApiService.authenticate().subscribe((response) => {
                console.log('AuthGuard passed');

                // Save token
                localStorage.setItem('token', response.body['token']);

                // return to router
                resolve(true);
            }, error => {
                switch (error.status) {
                    case 401:
                    case 440:
                        console.log('AuthGuard not passed - Navigate to login');
                        this.router.navigate(['login']);
                        break;
                    case 403:
                        console.log("AuthGuard not passed - Navigate to verification");
                        this.router.navigate(['verification']);
                }
                console.log(error);
                resolve(false);
            });
        })
    }
}
