import { __decorate } from "tslib";
import { Component } from '@angular/core';
let DonationPage = class DonationPage {
    constructor(connApi, toastController) {
        this.connApi = connApi;
        this.toastController = toastController;
        // Urls
        this.urlPartners = 'collector/partners';
        this.urlPartner = 'collector/partner';
        // Variables
        this.lPartners = [];
        this.oPartner = null;
    }
    ngOnInit() {
        // Partner
        this.connApi.safeGet(this.urlPartner).subscribe((response) => {
            let partner = response.body;
            if (partner != null) {
                this.oPartner = partner;
            }
        }, error => {
            console.log(error);
        });
        // Partners
        this.connApi.safeGet(this.urlPartners).subscribe((response) => {
            this.lPartners = response.body;
        });
    }
    savePartner() {
        // prepare data
        let data = {
            id: this.oPartner.id
        };
        // save
        this.connApi.safePost(this.urlPartner, data).subscribe((response) => {
            if (response.status == 200) {
            }
        });
    }
    onSelectedPartner($event) {
        if (this.oPartner == null) {
            this.oPartner = $event['detail']['value'];
        }
        else {
            this.oPartner = $event['detail']['value'];
            this.savePartner();
        }
    }
};
DonationPage = __decorate([
    Component({
        selector: 'app-donation',
        templateUrl: './donation.page.html',
        styleUrls: ['./donation.page.scss'],
    })
], DonationPage);
export { DonationPage };
//# sourceMappingURL=donation.page.js.map