import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let CookieGuardService = class CookieGuardService {
    constructor(toastController, api, authApiService, router) {
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
            this.toastCookie();
            return true;
        }
        else {
            return true;
        }
    }
    toastCookie() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Das Handysammlerportal nutzt Cookies. Bitte stimme der Nutzung zu um fortzufahren.',
                position: 'bottom',
                cssClass: 'my-toast',
                buttons: [
                    {
                        side: 'end',
                        role: 'cancel',
                        icon: 'checkmark',
                        text: 'Akzeptieren',
                        handler: () => {
                            localStorage.setItem('bCookie', 'true');
                        }
                    }, {
                        text: 'Weitere Informationen',
                        role: 'cancel',
                        handler: () => {
                            this.toastCookie();
                            this.onPrivacyPolicy();
                        }
                    }
                ]
            });
            toast.present();
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