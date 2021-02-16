import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let AddPage = class AddPage {
    constructor(connApi, alertController, router) {
        this.connApi = connApi;
        this.alertController = alertController;
        this.router = router;
        // Urls
        this.urlOrdersAvailable = 'collector/order/available';
        this.urlOrder = 'collector/order';
        this.boxChoice = [0];
        this.bricolageChoice = [0];
        this.flyerChoice = [0];
        this.posterChoice = [0];
        this.boxOrder = 0;
        this.bricolageOrder = 0;
        this.flyerOrder = 0;
        this.posterOrder = 0;
        this.orderDisabled = false;
        this.orderTaken = false;
        this.spinner = false;
        this.flyerSelected = false;
        this.posterSelected = false;
    }
    ngOnInit() {
        this.available();
    }
    onOrder() {
        if (this.boxAvailable == 0 && this.bricolageAvailable == 0 && this.flyerAvailable == 0 && this.posterAvailable == 0) {
            this.dialogLimitReached();
            return;
        }
        if (this.boxOrder == 0 && this.bricolageOrder == 0 && this.flyerOrder == 0 && this.posterOrder == 0) {
            this.dialogNoOrders();
            return;
        }
        this.orderDisabled = true;
        this.spinner = true;
        let json = {
            'box': this.boxOrder,
            'bricolage': this.bricolageOrder,
            'flyer': this.flyerOrder,
            'poster': this.posterOrder
        };
        this.connApi.safePut(this.urlOrder, json).subscribe((data) => {
            if (data.status == 200) {
                console.log('Order added');
                (() => __awaiter(this, void 0, void 0, function* () {
                    this.orderTaken = true;
                    yield new Promise(resolve => setTimeout(resolve, 2000));
                    this.spinner = false;
                    this.orderDisabled = false;
                }))();
            }
        });
    }
    onChangedBoxOrder() {
        if (!this.flyerSelected && !this.posterSelected) {
            this.flyerOrder = (this.boxOrder * 50 <= this.flyerAvailable) ? this.boxOrder * 50 : this.flyerAvailable;
            this.posterOrder = this.boxOrder * 5 <= this.posterAvailable ? this.boxOrder * 5 : this.posterAvailable;
        }
    }
    onChangedBricolageOrder() {
        if (!this.flyerSelected && !this.posterSelected) {
            this.flyerOrder = this.bricolageOrder * 50 <= this.flyerAvailable ? this.bricolageOrder * 50 : this.flyerAvailable;
            this.posterOrder = this.bricolageOrder * 5 <= this.posterAvailable ? this.bricolageOrder * 5 : this.posterAvailable;
        }
    }
    onChangedFlyerOrder() {
        if (!this.flyerSelected)
            this.flyerSelected = true;
    }
    onChangedPosterOrder() {
        console.log("jo");
        if (!this.posterSelected)
            this.posterSelected = true;
    }
    // Dialogs
    dialogLimitReached() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Bestell-Limit erreicht',
                message: 'Leider hast Du Dein Bestell-Limit erreicht. Weitere Bestellungen sind nächstes Jahr wieder möglich!',
                cssClass: 'my-alert',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    dialogNoOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Keine Bestellung ausgewählt',
                message: 'Bitte wähle deine Bestellung aus. Klicke dazu auf die jeweiligen Schaltflächen.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    compare(c1, c2) {
        return c1 == c2;
    }
    onClickPageInformation() {
        this.router.navigate(['collector/order/history']);
        this.boxChoice = [];
        this.bricolageChoice = [];
        this.flyerChoice = [];
        this.posterChoice = [];
        this.boxOrder = 0;
        this.bricolageOrder = 0;
        this.flyerOrder = 0;
        this.posterOrder = 0;
        this.orderDisabled = false;
        this.orderTaken = false;
        this.flyerSelected = false;
        this.posterSelected = false;
        this.available();
    }
    available() {
        this.connApi.safeGet(this.urlOrdersAvailable).subscribe((data) => {
            // Box
            this.boxAvailable = data.body['boxAvailable'];
            if (this.boxAvailable > 0) {
                for (var i = 1; i <= this.boxAvailable; i++) {
                    this.boxChoice.push(i);
                }
            }
            // Bricolage
            this.bricolageAvailable = data.body['bricolageAvailable'];
            if (this.bricolageAvailable > 0) {
                for (var i = 1; i <= this.bricolageAvailable; i++) {
                    this.bricolageChoice.push(i);
                }
            }
            // Flyer
            this.flyerAvailable = data.body['flyerAvailable'];
            if (this.flyerAvailable > 0) {
                for (var i = 50; i <= this.flyerAvailable; i += 50) {
                    this.flyerChoice.push(i);
                }
            }
            // Poster
            this.posterAvailable = data.body['posterAvailable'];
            if (this.posterAvailable > 0) {
                for (var i = 5; i <= this.posterAvailable; i += 5) {
                    this.posterChoice.push(i);
                }
            }
            this.boxMax = data.body['boxMax'];
            this.bricolageMax = data.body['bricolageMax'];
            console.log(data.body);
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