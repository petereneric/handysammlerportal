import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Alerts = class Alerts {
    constructor(AlertController) {
        this.AlertController = AlertController;
    }
    alertPopUp() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.AlertController.create({
                cssClass: 'my-alert',
                header: 'Pop-Ups',
                message: '<p>test</p>',
                buttons: [{ text: 'Hat geklappt' }, { text: 'Noch einmal versuchen' }]
            });
            yield alert.present();
        });
    }
};
Alerts = __decorate([
    Injectable()
], Alerts);
export { Alerts };
//# sourceMappingURL=alerts.js.map