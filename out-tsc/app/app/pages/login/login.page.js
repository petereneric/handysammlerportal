import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { Downloads } from '../../utilities/downloads';
import { Alert } from "../../utilities/alert";
import { environment } from '../../../environments/environment';
let LoginPage = class LoginPage {
    constructor(Alert, Downloads, alertController, authApiService, connApiService, router, fb, data) {
        this.Alert = Alert;
        this.Downloads = Downloads;
        this.alertController = alertController;
        this.authApiService = authApiService;
        this.connApiService = connApiService;
        this.router = router;
        this.fb = fb;
        this.data = data;
        //Constants
        this.maxInput = environment.maxInput;
        // Urls
        this.urlLogin = 'login';
        this.bSubmittedCollector = false;
        this.bSubmittedPartner = false;
        this.loginFormPartner = this.fb.group({
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
            cPassword: ['', [Validators.required, Validators.maxLength(this.maxInput)]]
        });
        this.loginFormCollector = this.fb.group({
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
            cPassword: ['', [Validators.required, Validators.maxLength(this.maxInput)]]
        });
        console.log('teeest');
    }
    ngOnInit() {
        console.log('ngOnInit: LoginPage');
        //this.data.currentRole.subscribe(role => console.log(this.selectedRole = role))
        this.selectedRole = 1;
        localStorage.setItem('bPopUp', 'false');
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
                this.Alert.invalidInput('E-Mail unbekannt');
            }
            if (error.status == 403) {
                this.Alert.invalidInput('Passwort falsch');
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
    isCollectorInput() {
    }
};
LoginPage = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.page.html',
        styleUrls: ['./login.page.scss'],
        providers: [Downloads, Alert]
    })
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.page.js.map