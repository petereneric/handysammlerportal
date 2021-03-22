import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Downloads } from '../../utilities/downloads';
let LoginPage = class LoginPage {
    constructor(Downloads, alertController, authApiService, connApiService, router, fb, data) {
        this.Downloads = Downloads;
        this.alertController = alertController;
        this.authApiService = authApiService;
        this.connApiService = connApiService;
        this.router = router;
        this.fb = fb;
        this.data = data;
        // Urls
        this.urlLogin = 'login';
        this.bSubmittedCollector = false;
        this.bSubmittedPartner = false;
        this.loginFormPartner = this.fb.group({
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cPassword: ['', [Validators.required, Validators.maxLength(50)]]
        });
        this.loginFormCollector = this.fb.group({
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cPassword: ['', [Validators.required, Validators.maxLength(50)]]
        });
        console.log('teeest');
    }
    ngOnInit() {
        console.log('ngOnInit: LoginPage');
        //this.data.currentRole.subscribe(role => console.log(this.selectedRole = role))
        this.selectedRole = 1;
    }
    segmentChanged(ev) {
        console.log('Segment changed', ev);
        this.data.changeRole(ev['detail']['value']);
    }
    login(role) {
        // check
        // check for invalid input
        if (role == 1) {
            this.bSubmittedCollector = true;
            if (!this.loginFormCollector.valid) {
                this.getFormValidationErrorsCollector();
                this.alertInvalid();
                return;
            }
        }
        if (role == 2) {
            this.bSubmittedPartner = true;
            if (!this.loginFormPartner.valid) {
                //this.getFormValidationErrors();
                this.alertInvalid();
                return;
            }
        }
        // prepare
        let data = {
            'role': role,
            'email': this.loginFormCollector.get('cEmail').value,
            'password': this.loginFormCollector.get('cPassword').value
        };
        this.connApiService.post(this.urlLogin, data).subscribe((data) => {
            if (data.status == 200) {
                // Save token
                console.log(data.headers.get('authorization'));
                localStorage.setItem('token', data.headers.get('authorization'));
                // Navigate
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 401) {
                this.alertWrongLoginCredentials('E-Mail-Adresse unbekannt');
            }
            if (error.status == 403) {
                this.alertWrongLoginCredentials('Passwort falsch');
            }
        });
    }
    getFormValidationErrorsCollector() {
        Object.keys(this.loginFormCollector.controls).forEach(key => {
            const controlErrors = this.loginFormCollector.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
    }
    get errorControlCollector() {
        return this.loginFormCollector.controls;
    }
    get errorControlPartner() {
        return this.loginFormPartner.controls;
    }
    onLoginCollector() {
        this.login(1);
    }
    onLoginPartner() {
        this.login(2);
    }
    navRegisterCollector() {
        this.router.navigate(['registration-collector/id/0']);
    }
    onResetPassword() {
        this.router.navigate(['request/role/' + this.selectedRole]);
    }
    // Alert
    alertWrongLoginCredentials(subheader) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                subHeader: subheader,
                message: 'Bitte überprüfe und korrigiere deine Eingabe.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    onInfo() {
        this.Downloads.becomeCollector();
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
        providers: [Downloads]
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map