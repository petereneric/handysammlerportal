import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
let InvalidPage = class InvalidPage {
    constructor(toastController, connApi, router) {
        this.toastController = toastController;
        this.connApi = connApi;
        this.router = router;
        // Urls
        this.urlRegistrationMail = "registration/mail";
    }
    ngOnInit() {
        let token = localStorage.getItem('token');
        if (token != null) {
            let tokenInfo = jwt_decode(token);
            let bVerified = tokenInfo['bVerified'];
            if (bVerified == 1)
                this.router.navigate(['app-root']);
        }
        else {
            this.router.navigate(['login']);
        }
    }
    onMail() {
        this.connApi.safePost(this.urlRegistrationMail, null).subscribe((data) => {
            if (data.status == 200) {
                this.toastSent();
            }
        }, error => {
            if (error.status == 412) {
                this.toastConfirmed();
                localStorage.removeItem('token');
                this.router.navigate(['login']);
            }
            console.log(error.message);
        });
    }
    // Toasts
    toastSent() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'E-Mail wurde versendet',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
    toastConfirmed() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Deine E-Mail Adresse wurde bereits bestätigt',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
};
InvalidPage = __decorate([
    Component({
        selector: 'app-invalid',
        templateUrl: './invalid.page.html',
        styleUrls: ['./invalid.page.scss'],
    })
], InvalidPage);
export { InvalidPage };
//# sourceMappingURL=invalid.page.js.map