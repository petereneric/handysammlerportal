import { __decorate } from "tslib";
import { Component } from '@angular/core';
import jwt_decode from 'jwt-decode';
let ConfirmationPage = class ConfirmationPage {
    constructor(router, activatedRoute, connApi) {
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.connApi = connApi;
        this.urlRegistrationVerify = 'registration/verify/';
        this.urlInformationForCollector = 'download/document/informations_for_collector';
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.token != null) {
                let token = localStorage.getItem('token');
                if (token != null) {
                    let tokenInfo = jwt_decode(token);
                    let bVerified = tokenInfo['bVerified'];
                    if (bVerified == 1) {
                        this.router.navigate(['app-root']);
                    }
                    else {
                        this.verifyToken(params.token);
                    }
                }
                else {
                    this.router.navigate(['app-root']);
                }
            }
        });
    }
    verifyToken(token) {
        this.connApi.get(this.urlRegistrationVerify + token).subscribe((response) => {
            console.log(response);
            localStorage.removeItem('token');
        }, error => {
            console.log(error);
            this.router.navigate(['invalid']);
        });
    }
    onInformation() {
        this.connApi.getPDF(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onLogin() {
        this.router.navigate(['login']);
    }
};
ConfirmationPage = __decorate([
    Component({
        selector: 'app-confirmation',
        templateUrl: './confirmation.page.html',
        styleUrls: ['./confirmation.page.scss'],
    })
], ConfirmationPage);
export { ConfirmationPage };
//# sourceMappingURL=confirmation.page.js.map