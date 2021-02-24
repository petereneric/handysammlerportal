import { __awaiter, __decorate } from "tslib";
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
        this.bChangePartner = true;
        this.bFirstSelect = false;
    }
    ngOnInit() {
        // Partner
        this.connApi.safeGet(this.urlPartner).subscribe((response) => {
            let partner = response.body;
            if (partner != null) {
                this.oPartner = partner;
                /*
                this.lPartners.forEach((element) => {
                  if (partner.cName === element.cName) {
                    this.oPartner = partner.cName;
                    console.log(partner.bChangePartner);
                    this.bChangePartner = partner.bChangePartner == 1 ? true : false;
                  }
                });
                 */
            }
        }, error => {
            console.log(error);
        });
        // Partners
        this.connApi.safeGet(this.urlPartners).subscribe((response) => {
            this.lPartners = response.body;
            console.log(this.lPartners);
        });
    }
    savePartner() {
        // prepare data
        /*
        let kPartner: number = 0;
        this.lPartners.forEach((element) => {
          if (element.cName === this.oPartner) {
            kPartner = element.kPartner;
          }
        });
         */
        let data = {
            id: this.oPartner.id
        };
        // save
        this.connApi.safePost(this.urlPartner, data).subscribe((response) => {
            if (response.status == 200) {
                this.toastSaved();
            }
        });
    }
    // Toasts
    toastSaved() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Deine Daten wurden erfolgreich gespeichert.',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'bottom'
            });
            yield toast.present();
        });
    }
    onSelectedPartner($event) {
        if (!this.bFirstSelect) {
            this.bFirstSelect = true;
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