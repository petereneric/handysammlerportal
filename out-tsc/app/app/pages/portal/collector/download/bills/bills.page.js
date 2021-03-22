import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
let BillsPage = class BillsPage {
    constructor(datepipe, connApi, toastController) {
        this.datepipe = datepipe;
        this.connApi = connApi;
        this.toastController = toastController;
        // Urls
        this.urlYears = 'collector/download/bill/years';
        this.urlBills = 'collector/download/bills/';
        this.urlBill = 'collector/download/bill';
        // Variables
        this.lYears = [];
        this.cYear = null;
        this.lBills = [];
    }
    ngOnInit() {
        this.connApi.safeGet(this.urlYears).subscribe((response) => {
            this.lYears = response.body;
            if (this.lYears.length > 0) {
                this.cYear = this.lYears[0];
                this.load();
            }
        }, error => {
            console.log(error);
        });
    }
    load() {
        this.connApi.safeGet(this.urlBills + this.cYear).subscribe((response) => {
            this.lBills = response.body;
        }, error => {
            console.log(error);
        });
    }
    onYear() {
        this.load();
    }
    onBill(kBill) {
        console.log(kBill);
        this.connApi.safeGetFile(this.urlBill + '/' + kBill).subscribe(response => {
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            if (error.status) {
                this.toastNotFound();
            }
        });
    }
    // Toasts
    toastNotFound() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Abrechnung konnte nicht gefunden werden.',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
    getDate(date) {
        return this.datepipe.transform(date, 'dd.') + ' ' + this.getMonth(this.datepipe.transform(date, 'M'));
    }
    getMonth(month) {
        let lMonth = [];
        lMonth[1] = 'Januar';
        lMonth[2] = 'Februar';
        lMonth[3] = 'März';
        lMonth[4] = 'April';
        lMonth[5] = 'Mai';
        lMonth[6] = 'Juni';
        lMonth[7] = 'Juli';
        lMonth[8] = 'August';
        lMonth[9] = 'September';
        lMonth[10] = 'Oktober';
        lMonth[11] = 'November';
        lMonth[12] = 'Dezember';
        return lMonth[month];
    }
    onTotal() {
        this.connApi.safeGetFile(this.urlBill).subscribe(response => {
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }
};
BillsPage = __decorate([
    Component({
        selector: 'app-bills',
        templateUrl: './bills.page.html',
        styleUrls: ['./bills.page.scss'],
        providers: [DatePipe]
    })
], BillsPage);
export { BillsPage };
//# sourceMappingURL=bills.page.js.map