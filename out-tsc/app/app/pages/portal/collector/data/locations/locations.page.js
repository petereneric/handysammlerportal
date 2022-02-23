import { __awaiter, __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { environment } from '../../../../../../environments/environment';
let LocationsPage = class LocationsPage {
    constructor(router, connApi, formBuilder, toastController, alertController, dataService) {
        this.router = router;
        this.connApi = connApi;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.alertController = alertController;
        this.dataService = dataService;
        //Constants
        this.maxZip = environment.maxZip;
        this.maxInput = environment.maxInput;
        // Urls
        this.urlLocation = 'collector/location';
        this.urlLocationActive = 'collector/location/active';
        this.urlLocations = 'collector/locations';
        // FormBuilder
        this.fgLocation = this.formBuilder.group({
            cName: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
            cWebsite: ['', [Validators.maxLength(this.maxInput)]],
            cStreet: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
            cStreetNumber: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
            cZip: ['', [Validators.required, Validators.minLength(this.maxZip), Validators.maxLength(this.maxZip)]],
            cCity: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        });
        // Variables
        this.bEdit = false;
        this.bAdd = false;
        this.bSubmitted = false;
        this.lLocationsActive = [];
        this.lLocationsNotActive = [];
        this.oLocationEdit = null;
    }
    ngOnInit() {
        this.load();
    }
    load() {
        this.lLocationsActive = [];
        this.lLocationsNotActive = [];
        // Get Locations
        this.connApi.safeGet(this.urlLocations).subscribe((response) => {
            console.log(response.body);
            let lLocations = response.body;
            lLocations.forEach((location) => {
                if (location.bActive == 1) {
                    this.lLocationsActive.push(location);
                }
                else {
                    this.lLocationsNotActive.push(location);
                }
            });
            if (lLocations.length == 0)
                this.bAdd = true;
        });
    }
    onSaveAdd() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.fgLocation.valid) {
            this.alertInvalid();
            return;
        }
        // prepare
        let location = {
            cName: this.fgLocation.get('cName').value,
            cWebsite: this.fgLocation.get('cWebsite').value,
            cStreet: this.fgLocation.get('cStreet').value,
            cStreetNumber: this.fgLocation.get('cStreetNumber').value,
            cZip: this.fgLocation.get('cZip').value,
            cCity: this.fgLocation.get('cCity').value,
        };
        // send
        this.connApi.safePut(this.urlLocation, location).subscribe((data) => {
            if (data.status == 200) {
                this.dataService.callLocation(null);
                this.bAdd = false;
                this.bSubmitted = false;
                const location = data.body;
                this.lLocationsNotActive.push(location);
                this.alertAdded(location);
                this.fgLocation.reset();
            }
        }, error => {
            console.log(error);
            if (error.status == 406) {
                this.alertLocationForgiven();
            }
        });
    }
    onSaveEdit() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.fgLocation.valid) {
            this.alertInvalid();
            return;
        }
        // prepare
        this.oLocationEdit.cName = this.fgLocation.get('cName').value;
        this.oLocationEdit.cWebsite = this.fgLocation.get('cWebsite').value;
        this.oLocationEdit.cStreet = this.fgLocation.get('cStreet').value;
        this.oLocationEdit.cStreetNumber = this.fgLocation.get('cStreetNumber').value;
        this.oLocationEdit.cZip = this.fgLocation.get('cZip').value;
        // send
        this.connApi.safePost(this.urlLocation, this.oLocationEdit).subscribe((data) => {
            if (data.status == 200) {
                this.dataService.callLocation(null);
                this.bEdit = false;
                this.bSubmitted = false;
                this.fgLocation.reset();
                this.oLocationEdit = null;
            }
        }, error => {
            console.log(error);
            if (error.status == 406) {
                this.alertLocationForgiven();
            }
        });
    }
    get errorControl() {
        return this.fgLocation.controls;
    }
    ping($event) {
        const location = $event.object;
        if ('check' === $event.label) {
            this.upload(location);
            if (location.bActive) {
                this.lLocationsActive.push(location);
                this.lLocationsNotActive.splice(this.lLocationsNotActive.indexOf(location), 1);
            }
            else {
                this.lLocationsNotActive.push(location);
                this.lLocationsActive.splice(this.lLocationsActive.indexOf(location), 1);
            }
        }
        if ('edit' == $event.label) {
            this.onEdit(location);
        }
        if ('delete' == $event.label) {
            this.onDelete(location);
        }
    }
    upload(location) {
        console.log(location);
        this.connApi.safePost(this.urlLocation, location).subscribe((response) => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
    onEdit(location) {
        this.isEditing(true);
        this.oLocationEdit = location;
        // data
        this.fgLocation.controls['cName'].setValue(location.cName);
        this.fgLocation.controls['cWebsite'].setValue(location.cWebsite);
        this.fgLocation.controls['cStreetNumber'].setValue(location.cStreetNumber);
        this.fgLocation.controls['cStreet'].setValue(location.cStreet);
        this.fgLocation.controls['cZip'].setValue(location.cZip);
        this.fgLocation.controls['cCity'].setValue(location.cCity);
        // scroll to top
        this.content.scrollToTop(400);
    }
    onDelete(location) {
        this.alertDelete(location);
    }
    isAdding(bAdd) {
        this.bAdd = bAdd;
        if (!bAdd) {
            this.fgLocation.reset();
        }
        else {
            this.bEdit = false;
        }
    }
    isEditing(bEdit) {
        this.bEdit = bEdit;
        if (!bEdit) {
            this.fgLocation.reset();
            this.oLocationEdit = null;
        }
        else {
            this.bAdd = false;
        }
    }
    alertInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Fehlerhafte Eingabe',
                message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
                cssClass: 'my-alert',
                buttons: ['Ok']
            });
            yield alert.present();
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
    alertLocationForgiven() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Hinzufügen nicht möglich',
                subHeader: 'Sammelstandort existiert bereits',
                message: 'Bitte prüfe ob an diesem Sammelstandort bereits eine Mobile-Box steht, falls nicht melde dich bitte per Mail bei uns, damit wir diesen Standort freigeben können.',
                cssClass: 'my-alert',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertDelete(locaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Wirklich löschen?',
                subHeader: locaction.cName,
                cssClass: 'my-alert',
                buttons: [
                    {
                        text: 'Bestätigen',
                        handler: () => {
                            console.log(locaction.id);
                            this.connApi.safeDelete(this.urlLocation + "/" + locaction.id).subscribe((response) => {
                                this.dataService.callLocation(null);
                                console.log(response);
                                if (locaction.bActive == 1) {
                                    this.lLocationsActive.splice(this.lLocationsActive.indexOf(locaction), 1);
                                }
                                else {
                                    this.lLocationsNotActive.splice(this.lLocationsNotActive.indexOf(locaction), 1);
                                }
                            }, error => {
                                console.log(error);
                            });
                        }
                    },
                    { text: 'Abrechen',
                        role: 'cancel' }
                ]
            });
            yield alert.present();
        });
    }
    alertAdded(locaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Sammelstandort hinzugefügt',
                subHeader: locaction.cName,
                message: 'Wir haben diesen Sammelstandort zunächst auf inaktiv gesetzt. Wenn dort bereits eine Sammelbox steht, klicke bitte auf Aktivieren. Wenn du bereits eine Sammelbox für diesen Sammelstandort vorliegen hast, diese aber erst ' +
                    'später aufstellen möchtest, klicke bitte auf später und aktiviere den Sammelstandort sobald die Sammelbox aufgestellt wurde. Dazu klickst du bitte auf die Checkbox des Sammelstandortes. Wenn du für diesen Sammelstandort noch keine Sammelbox ' +
                    'vorliegen hast und auch noch keine bestellt hast, klicke bitte auf Bestellen.',
                cssClass: 'my-alert',
                buttons: [
                    {
                        text: 'Aktivieren',
                        handler: () => {
                            // prepare
                            let data = {
                                id: locaction.id
                            };
                            this.connApi.safePost(this.urlLocationActive, data).subscribe((response) => {
                                this.load();
                            });
                        }
                    },
                    { text: 'Später' },
                    { text: 'Bestellen', handler: () => {
                            this.router.navigate(['collector/menu/order/tabs/add']);
                        } }
                ]
            });
            yield alert.present();
        });
    }
};
__decorate([
    ViewChild(IonContent)
], LocationsPage.prototype, "content", void 0);
LocationsPage = __decorate([
    Component({
        selector: 'app-locations',
        templateUrl: './locations.page.html',
        styleUrls: ['./locations.page.scss'],
    })
], LocationsPage);
export { LocationsPage };
//# sourceMappingURL=locations.page.js.map