import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CookieGuardService = class CookieGuardService {
    constructor(alert, toastController, api, authApiService, router) {
        this.alert = alert;
        this.toastController = toastController;
        this.api = api;
        this.authApiService = authApiService;
        this.router = router;
        // Urls
        this.urlPrivacyPolicy = 'agreement/privacy_policy/';
    }
    canActivate(r) {
        console.log("cookie!");
        let bCookie = localStorage.getItem('bCookie');
        if (bCookie == null || bCookie === 'false') {
            this.dialogCookie();
            return true;
        }
        else {
            return true;
        }
    }
    dialogCookie() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alert.create({
                header: 'Cookies',
                message: 'Wir, bei uns im Handysammler-Portal, nutzen keine Cookies zur Speicherung oder Verarbeitung deiner Daten. Du musst deren Nutzung also nicht zustimmen.',
                cssClass: 'my-alert',
                buttons: [{ text: 'Ok',
                        handler: () => {
                            localStorage.setItem('bCookie', 'true');
                        } },
                    {
                        text: 'Weitere Informationen',
                        handler: () => {
                            this.onPrivacyPolicy();
                        }
                    }]
            });
            yield alert.present();
        });
    }
    onPrivacyPolicy() {
        this.api.getFile(this.urlPrivacyPolicy + 1).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
};
CookieGuardService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CookieGuardService);
export { CookieGuardService };
//# sourceMappingURL=cookie-guard.service.js.map