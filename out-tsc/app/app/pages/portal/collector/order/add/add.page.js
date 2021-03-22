import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
let AddPage = class AddPage {
    constructor(connApi, alertController, router, dataService) {
        this.connApi = connApi;
        this.alertController = alertController;
        this.router = router;
        this.dataService = dataService;
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
        this.dataService.callbackLocation().subscribe((data) => {
            this.available();
        });
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
                this.available();
                this.dataService.publishData(null);
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
            this.flyerOrder = (this.boxOrder * 100 <= this.flyerAvailable) ? this.boxOrder * 100 : this.flyerAvailable;
            this.posterOrder = this.boxOrder * 2 <= this.posterAvailable ? this.boxOrder * 2 : this.posterAvailable;
        }
    }
    onChangedBricolageOrder() {
        if (!this.flyerSelected && !this.posterSelected) {
            this.flyerOrder = this.bricolageOrder * 100 <= this.flyerAvailable ? this.bricolageOrder * 100 : this.flyerAvailable;
            this.posterOrder = this.bricolageOrder * 2 <= this.posterAvailable ? this.bricolageOrder * 2 : this.posterAvailable;
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
        this.connApi.safeGet(this.urlOrdersAvailable).subscribe((response) => {
            console.log(response.body);
            this.data = response.body;
            this.oBox = this.data.oBox;
            this.oBricolage = this.data.oBricolage;
            // Box
            if (this.oBox.bAvailable == 1) {
                this.oBox.maxOrder = Math.floor((+this.data.nLocations + (this.data.nDevices / this.data.intervallDevices) - this.oBox.nOrder - this.oBricolage.nOrder));
                console.log(this.oBox.maxOrder);
                if (this.oBox.maxOrder > 0) {
                    for (var i = 1; i <= this.oBox.maxOrder && i <= 5; i++) {
                        this.boxChoice.push(i);
                    }
                }
            }
            else {
                this.oBox.maxOrder = 0;
            }
            // Bricolage
            if (this.oBricolage.bAvailable == 1) {
                this.oBricolage.maxOrder = Math.floor((+this.data.nLocations + (this.data.nDevices / this.data.intervallDevices) - this.oBricolage.nOrder - this.oBox.nOrder));
                console.log("joo" + this.oBricolage.maxOrder);
                if (this.oBricolage.maxOrder > 0) {
                    for (var i = 1; i <= this.oBricolage.maxOrder && i <= 5; i++) {
                        this.bricolageChoice.push(i);
                    }
                }
            }
            else {
                this.oBricolage.maxOrder = 0;
            }
            // Flyer
            this.flyerAvailable = 500;
            if (this.flyerAvailable > 0) {
                for (var i = 100; i <= this.flyerAvailable; i += 100) {
                    this.flyerChoice.push(i);
                }
            }
            // Poster
            this.posterAvailable = 10;
            if (this.posterAvailable > 0) {
                for (var i = 2; i <= this.posterAvailable; i += 2) {
                    this.posterChoice.push(i);
                }
            }
            /*
                        // Bricolage
                        this.bricolageAvailable = data.body['bricolageAvailable'];
                        if (this.bricolageAvailable > 0) {
                            for (var i = 1; i <= this.bricolageAvailable; i++) {
                                this.bricolageChoice.push(i);
                            }
                        }



                        this.boxMax = data.body['boxMax'];
                        console.log(this.boxMax);
                        this.bricolageMax = data.body['bricolageMax'];
                        console.log(data.body);

                         */
        });
    }
    getRestIntervall() {
        if (this.data != null) {
            return Math.floor(this.data.nDevices % this.data.intervallDevices) == 0 ? 200 : Math.floor(this.data.nDevices % this.data.intervallDevices);
        }
    }
    onLocation() {
        this.router.navigate(['collector/menu/data/tabs/locations']);
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