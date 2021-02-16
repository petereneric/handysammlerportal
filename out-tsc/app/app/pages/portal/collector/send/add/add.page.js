import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let AddPage = class AddPage {
    constructor(connApi, router, alertController) {
        this.connApi = connApi;
        this.router = router;
        this.alertController = alertController;
        // Urls
        this.urlLithiumIonLabel = 'collector/lithium-ion-label';
        this.urlLabel = 'collector/label';
    }
    ngOnInit() {
    }
    onClickLithiumNotice() {
        this.connApi.safeGetPDF(this.urlLithiumIonLabel).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onClickShippingLabel() {
        this.dialogCreateLabel();
    }
    // Dialogs
    dialogMaxLabels() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
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
                header: 'Versand bestätigen',
                message: 'Bitte bestätige uns kurz, dass du Dein Paket fertig gepackt und den Lithium-Ionen-Warnhinweis ' +
                    'aufgeklebt hast. Danach erstellen wir Dir ein neues Versand-Label und merken ' +
                    'Deine Versendung vor.',
                buttons: [{ 'text': 'Bestätigen', handler: () => {
                            this.connApi.safeGet(this.urlLabel).subscribe(response => {
                                console.log(response);
                                console.log(response.status);
                            }, error => {
                                if (error.status == 429) {
                                    this.dialogMaxLabels();
                                }
                            });
                        }
                    }]
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
    })
], AddPage);
export { AddPage };
//# sourceMappingURL=add.page.js.map