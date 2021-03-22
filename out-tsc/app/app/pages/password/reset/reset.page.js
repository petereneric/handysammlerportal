import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
let ResetPage = class ResetPage {
    constructor(toastController, router, alertController, activatedRoute, fb, connApi) {
        this.toastController = toastController;
        this.router = router;
        this.alertController = alertController;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.connApi = connApi;
        // Urls
        this.urlReset = 'password/reset';
        // Variables
        this.bSubmitted = false;
        this.bShowPassword = false;
        this.token = null;
        this.role = null;
        // FormBuilder
        this.formGroup = this.fb.group({
            cPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])^[A-Za-z0-9$@$!%*?&].{7,}'), Validators.minLength(8)]]
        });
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            let exp;
            if (params.token != null) {
                this.token = params.token;
                let tokenInfo = jwt_decode(this.token);
                this.role = tokenInfo['role'];
                exp = tokenInfo['exp'];
                if (this.role == null || exp == null) {
                    this.router.navigate(['app-root']);
                }
                // Check if token has expired
                if ((Date.now() / 1000) > exp) {
                    this.alertInvalidToken();
                }
            }
            else {
                this.router.navigate(['app-root']);
            }
        });
    }
    get errorControl() {
        return this.formGroup.controls;
    }
    onShow() {
        this.bShowPassword = !this.bShowPassword;
    }
    onSave() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.formGroup.valid) {
            this.alertInvalid();
            return;
        }
        // prepare
        let data = {
            password: this.formGroup.get('cPassword').value,
            token: this.token
        };
        // send
        this.connApi.post(this.urlReset, data).subscribe((response) => {
            this.toastSaved();
            localStorage.removeItem('token');
            this.router.navigate(['app-root']);
        }, error => {
            console.log(error);
        });
    }
    // Password
    passwordInactive() {
        return this.formGroup.get('cPassword').value.length == 0;
    }
    passwordLength() {
        return this.formGroup.get('cPassword').value.length >= 8;
    }
    passwordBigSmall() {
        let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
        return regex.test(this.formGroup.get('cPassword').value);
    }
    passwordNumber() {
        let regex = new RegExp('(?=.*[1-9])');
        return regex.test(this.formGroup.get('cPassword').value);
    }
    passwordExtra() {
        let regex = new RegExp('(?=.*[§#@$!%*?&])');
        return regex.test(this.formGroup.get('cPassword').value);
    }
    // Toasts
    toastSaved() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Dein Passwort wurde erfolgreich zurückgesetzt.',
                duration: 4000,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
    alertInvalidToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Dieser Link ist ungültig',
                message: 'Möglicherweise ist der Link abegelaufen, da er nach Zusendung nur eine Stunde lang gültig ist. In diesem Fall kannst du dir einen neuen zusenden lassen.',
                buttons: [{ text: 'Ok', handler: () => { this.router.navigate(['request/role/' + ((this.role == 0) ? 1 : 0)]); } }]
            });
            yield alert.present();
        });
    }
    alertInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültiges Passwort',
                message: 'Bitte ändere dein Passwort, sodass es alle unter dem Passwort stehenden Bedingungen erfüllt.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
};
ResetPage = __decorate([
    Component({
        selector: 'app-reset',
        templateUrl: './reset.page.html',
        styleUrls: ['./reset.page.scss'],
    })
], ResetPage);
export { ResetPage };
//# sourceMappingURL=reset.page.js.map