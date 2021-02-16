import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { ConnApiService } from "../../../services/conn-api/conn-api.service";
let ResetPasswordPage = class ResetPasswordPage {
    constructor(fb, connApi, data, router, alertController) {
        this.fb = fb;
        this.connApi = connApi;
        this.data = data;
        this.router = router;
        this.alertController = alertController;
        this.resetForm = this.fb.group({
            inputEmail: ['']
        });
    }
    ngOnInit() {
        this.data.currentRole.subscribe(role => console.log(this.role = role));
    }
    onResetPassword() {
        let json = {
            'role': this.role,
            'email': this.resetForm.get('inputEmail').value
        };
        console.log(json);
        this.connApi.post(ConnApiService.postMailResetPassword, json).subscribe((data) => {
            console.log("jooo");
            if (data.status == 200) {
                console.log("Reset-Password Mail sent");
                this.alertCheckEmail();
            }
        }, error => {
            if (error.status == 400) {
                console.log("Email Adress unknown");
            }
        });
    }
    alertCheckEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'E-Mail versendet',
                message: 'Wir haben Dir soeben eine E-Mail zum Zurücksetzen Deines Passworts gesendet.',
                buttons: [{ text: 'Zurück zum Login', handler: () => { this.router.navigate(['login']); } }]
            });
            yield alert.present();
        });
    }
};
ResetPasswordPage = __decorate([
    Component({
        selector: 'app-reset-password',
        templateUrl: './reset-password.page.html',
        styleUrls: ['./reset-password.page.scss'],
    })
], ResetPasswordPage);
export { ResetPasswordPage };
//# sourceMappingURL=reset-password.page.js.map