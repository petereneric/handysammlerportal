import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
let RoleGuardService = class RoleGuardService {
    constructor(authApiService, router) {
        this.authApiService = authApiService;
        this.router = router;
    }
    canActivate(route) {
        return new Promise((resolve) => {
            this.authApiService.authenticate().subscribe((response) => {
                // Save token
                localStorage.setItem('token', response.headers.get('authorization'));
                // Get role from token
                let token = response.headers.get('authorization');
                let tokenInfo = jwt_decode(token);
                let role = tokenInfo['role'];
                // Navigate
                if (role == 1) {
                    console.log('navigate to collector portal');
                    this.router.navigate(['collector']);
                }
                if (role == 2) {
                    this.router.navigate(['partner']);
                }
                // Return
                resolve(true);
            }, error => {
                switch (error.status) {
                    case 401:
                    case 440:
                        console.log('navigate to login');
                        this.router.navigate(['login']);
                        break;
                    case 412:
                        console.log("navigate to verify page");
                        this.router.navigate(['verification']);
                    case 451:
                        console.log("navigate to agreement page");
                        this.router.navigate(['agreement']);
                }
                console.log(error);
                resolve(false);
            });
        });
    }
};
RoleGuardService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], RoleGuardService);
export { RoleGuardService };
//# sourceMappingURL=role-guard.service.js.map