import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Alert } from '../../../../../utilities/alert';
let AddPage = class AddPage {
    constructor(Alert, connApi, router, alertController) {
        this.Alert = Alert;
        this.connApi = connApi;
        this.router = router;
        this.alertController = alertController;
        // Urls
        this.urlLithiumIonLabel = 'collector/lithium-ion-label';
        this.urlLabel = 'collector/label';
    }
    ngOnInit() {
        //localStorage.setItem('bPopUp', 'false');
    }
    onClickLithiumNotice() {
        this.connApi.safeGetFile(this.urlLithiumIonLabel).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.alertPopUp().then(res => {
                console.log('reuslt ' + res);
                if (!res) {
                    console.log("yeah");
                    this.onClickLithiumNotice();
                }
            });
        });
    }
    onClickShippingLabel() {
        this.dialogCreateLabel();
    }
    // Dialogs
    dialogMaxLabels() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Maximale Versandmenge',
                message: 'Du hast Deine maximal täglich verfügbare Versandmenge erreicht und kannst heute leider kein weiteres ' +
                    'Versand-Label erstellen. Weitere Versendungen sind morgen wieder möglich',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    dialogCreateLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Versand bestätigen',
                message: 'Bitte bestätige uns kurz, dass du Dein Paket fertig gepackt und den Lithium-Ionen-Warnhinweis ' +
                    'aufgeklebt hast. Danach erstellen wir Dir ein neues Versand-Label und merken ' +
                    'Deine Versendung vor.',
                buttons: [{
                        'text': 'Bestätigen',
                        handler: () => {
                            this.connApi.safeGetFile(this.urlLabel).subscribe(response => {
                                console.log(response);
                                let blob = new Blob([response], { type: 'application/pdf' });
                                const url = window.URL.createObjectURL(blob);
                                window.open(url);
                            }, error => {
                                console.log(error);
                                if (error.status == 429) {
                                    this.dialogMaxLabels();
                                }
                            });
                        }
                    }, 'Ich bin noch nicht soweit']
            });
            yield alert.present();
        });
    }
};
AddPage = __decorate([
    Component({
        selector: 'app-add',
        templateUrl: './add.page.html',
        styleUrls: ['./add.page.scss'],
        providers: [Alert]
    })
], AddPage);
export { AddPage };
//# sourceMappingURL=add.page.js.map