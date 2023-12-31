import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';
let RequestPage = class RequestPage {
    constructor(router, alertController, activatedRoute, fb, connApi) {
        this.router = router;
        this.alertController = alertController;
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.connApi = connApi;
        //Constants
        this.maxInput = environment.maxInput;
        // Urls
        this.urlPasswordRequest = "password/request";
        // Variables
        this.bSubmitted = false;
        this.role = null;
        // FormBuilder
        this.formGroup = this.fb.group({
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
        });
    }
    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.role != null && (params.role == 0 || params.role == 1)) {
                this.role = params.role;
            }
            else {
                this.router.navigate(['app-root']);
            }
        });
    }
    get errorControl() {
        return this.formGroup.controls;
    }
    onMail() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.formGroup.valid) {
            return;
        }
        // prepare
        let data = {
            'role': this.role,
            'email': this.formGroup.get('cEmail').value
        };
        // send
        this.connApi.post(this.urlPasswordRequest, data).subscribe((data) => {
            console.log("hier");
            console.log(data.status);
            if (data.status == 200) {
                console.log("jo??)");
                this.alertCheckEmail();
            }
        }, error => {
            console.log(error);
            if (error.status == 400) {
                this.alertUnknownEmail();
            }
        });
    }
    alertCheckEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'E-Mail versendet',
                message: 'Bitte öffne die an Dich versendete E-Mail, um dein Passwort zurückzusetzen.',
                buttons: [{ text: 'Ok', handler: () => { this.router.navigate(['app-root']); } }]
            });
            yield alert.present();
        });
    }
    alertUnknownEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                subHeader: 'E-Mail-Adresse unbekannt',
                message: 'In unserer Datenbank existiert kein ' + ((this.role == 0) ? 'Sammler' : 'Partner') + ' mit dieser E-Mail Adresse.',
                buttons: ['Ok', { text: 'Ich bin ein ' + ((this.role == 1) ? 'Partner' : 'Sammler'), handler: () => { this.role = (this.role == 1) ? 0 : 1; } }]
            });
            yield alert.present();
        });
    }
};
RequestPage = __decorate([
    Component({
        selector: 'app-request',
        templateUrl: './request.page.html',
        styleUrls: ['./request.page.scss'],
    })
], RequestPage);
export { RequestPage };
//# sourceMappingURL=request.page.js.map