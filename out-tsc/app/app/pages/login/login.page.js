import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ConnApiService } from "../../services/conn-api/conn-api.service";
let LoginPage = class LoginPage {
    constructor(authApiService, connApiService, router, fb, data) {
        this.authApiService = authApiService;
        this.connApiService = connApiService;
        this.router = router;
        this.fb = fb;
        this.data = data;
        this.loginFormPartner = this.fb.group({
            email: [''],
            password: ['']
        });
        this.loginFormCollector = this.fb.group({
            email: [''],
            password: ['']
        });
        console.log("teeest");
    }
    ngOnInit() {
        console.log("ngOnInit: LoginPage");
        //this.data.currentRole.subscribe(role => console.log(this.selectedRole = role))
        this.selectedRole = 0;
    }
    segmentChanged(ev) {
        console.log('Segment changed', ev);
        this.data.changeRole(ev['detail']['value']);
    }
    login(role) {
        let data = {
            'role': role,
            'email': this.loginFormCollector.get('email').value,
            'password': this.loginFormCollector.get('password').value
        };
        this.connApiService.post(ConnApiService.postLogin, data).subscribe((data) => {
            if (data.status == 200) {
                // Save token
                console.log(data.headers.get('authorization'));
                localStorage.setItem('token', data.headers.get('authorization'));
                // Navigate
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 401) {
                console.log('wrong login credentials');
            }
            if (error.status == 412) {
                this.router.navigate(['verification']);
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
        this.router.navigate(['registration-collector/id/0']);
    }
    onResetPassword() {
        this.router.navigate(['request/role/' + this.selectedRole]);
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map