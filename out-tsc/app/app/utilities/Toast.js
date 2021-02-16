import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Toast = class Toast {
    constructor(toastController) {
        this.toastController = toastController;
    }
    fileNotFound() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Dokument konnte nicht gefunden werden.',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
};
Toast = __decorate([
    Injectable()
], Toast);
export { Toast };
//# sourceMappingURL=Toast.js.map