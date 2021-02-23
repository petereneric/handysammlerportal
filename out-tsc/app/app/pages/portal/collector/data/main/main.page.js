import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let MainPage = class MainPage {
    constructor(connApi, formBuilder, toastController, alertController) {
        this.connApi = connApi;
        this.formBuilder = formBuilder;
        this.toastController = toastController;
        this.alertController = alertController;
        // Urls
        this.urlCollector = 'collector/main';
        this.urlTypes = 'types';
        this.urlSave = 'collector/main';
        this.urlRegionStates = 'region/states';
        this.urlRegionCountries = 'region/countries';
        this.urlPasswordRequest = "password/request";
        // FormBuilder
        this.fgCollector = this.formBuilder.group({
            cName: ['', [Validators.required, Validators.maxLength(80)]],
            cNameDetails: ['', [Validators.maxLength(80)]],
            cStreet: ['', [Validators.required, Validators.maxLength(50)]],
            cStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
            cZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
            cCity: ['', [Validators.required, Validators.maxLength(50)]],
            cPrenamePerson: ['', [Validators.required, Validators.maxLength(50)]],
            cSurnamePerson: ['', [Validators.required, Validators.maxLength(50)]],
            cPhoneFixedLine: ['', [Validators.maxLength(50)]],
            cPhoneMobile: ['', [Validators.maxLength(50)]],
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cEmailCC: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cShippingAddressOne: ['', [Validators.required, Validators.maxLength(80)]],
            cShippingAddressTwo: ['', [Validators.maxLength(50)]],
            cShippingAddressThree: ['', [Validators.maxLength(50)]],
            cShippingStreet: ['', [Validators.required, Validators.maxLength(50)]],
            cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
            cShippingZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
            cShippingCity: ['', [Validators.required, Validators.maxLength(50)]],
        });
        this.oType = null;
        this.lTypes = [];
        this.oTitle = null;
        this.lTitles = [{ cName: 'Herr' }, { cName: 'Frau' }, { cName: 'Herr Dr.' }, { cName: 'Frau Dr.' },];
        this.bFormally = true;
        this.oState = null;
        this.lCountries = [];
        this.lStates = [];
        this.bSubmitted = false;
    }
    ngOnInit() {
        // collector
        this.connApi.safeGet(this.urlCollector).subscribe((response) => {
            this.dataCollector = response.body;
            let collector = response.body;
            console.log(collector);
            // controls
            this.fgCollector.controls['cName'].setValue(collector.cName);
            this.fgCollector.controls['cNameDetails'].setValue(collector.cNameDetails);
            this.fgCollector.controls['cStreet'].setValue(collector.cStreet);
            this.fgCollector.controls['cStreetNumber'].setValue(collector.cStreetNumber);
            this.fgCollector.controls['cZip'].setValue(collector.cZip);
            this.fgCollector.controls['cCity'].setValue(collector.cCity);
            this.fgCollector.controls['cPrenamePerson'].setValue(collector.cPrenamePerson);
            this.fgCollector.controls['cSurnamePerson'].setValue(collector.cSurnamePerson);
            this.fgCollector.controls['cPhoneFixedLine'].setValue(collector.cPhoneFixedLine);
            this.fgCollector.controls['cPhoneMobile'].setValue(collector.cPhoneMobile);
            this.fgCollector.controls['cEmail'].setValue(collector.cEmail);
            this.fgCollector.controls['cEmailCC'].setValue(collector.cEmailCC);
            this.fgCollector.controls['cShippingAddressOne'].setValue(collector.cShippingNameOne);
            this.fgCollector.controls['cShippingAddressTwo'].setValue(collector.cShippingNameTwo);
            this.fgCollector.controls['cShippingAddressThree'].setValue(collector.cShippingNameThree);
            this.fgCollector.controls['cShippingStreet'].setValue(collector.cShippingStreet);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(collector.cShippingStreetNumber);
            this.fgCollector.controls['cShippingZip'].setValue(collector.cShippingZip);
            this.fgCollector.controls['cShippingCity'].setValue(collector.cShippingCity);
            // type
            // types
            this.connApi.safeGet(this.urlTypes).subscribe((data) => {
                this.lTypes = data.body;
                this.lTypes.forEach((element) => {
                    if (collector.kType == element.id) {
                        console.log("hheee");
                        this.oType = element;
                    }
                });
            });
            // title
            this.oTitle = collector.cTitlePerson;
            // formally
            this.bFormally = collector.bAddressFormally;
            // country
            this.oCountry = collector.cCountry;
            // region
            this.connApi.get(this.urlRegionCountries).subscribe((response) => {
                console.log(response);
                this.lCountries = response.body;
                this.lCountries.forEach(country => {
                    if (country.id == collector.kCountry) {
                        this.oCountry = country;
                    }
                    if (country.id == collector.kShippingCountry) {
                        this.oShippingCountry = country;
                    }
                });
                if (this.oCountry != null) {
                    // @ts-ignore
                    this.loadStates(this.oCountry.id);
                }
            });
            // addressIdentical
            this.bAddressIdentSelected = this.compareAddress();
            setTimeout(() => {
                this.bChanged = false;
            }, 1500);
        });
    }
    onSave() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.fgCollector.valid || this.oType == null || this.oCountry == null || this.oShippingCountry == null || this.oTitle == null) {
            this.alertInvalid();
            return;
        }
        // prepare data
        let kType = this.oType.id;
        let collector = {
            cName: this.fgCollector.get('cName').value,
            cNameDetails: this.fgCollector.get('cNameDetails').value,
            kType: kType,
            cStreet: this.fgCollector.get('cStreet').value,
            cStreetNumber: this.fgCollector.get('cStreetNumber').value,
            cZip: this.fgCollector.get('cZip').value,
            cCity: this.fgCollector.get('cCity').value,
            cCountry: this.oCountry,
            cState: this.oState,
            cPrenamePerson: this.fgCollector.get('cPrenamePerson').value,
            cSurnamePerson: this.fgCollector.get('cSurnamePerson').value,
            cTitle: this.oTitle,
            bAddressFormally: this.bFormally ? 1 : 0,
            cPhoneFixedLine: this.fgCollector.get('cPhoneFixedLine').value,
            cPhoneMobile: this.fgCollector.get('cPhoneMobile').value,
            cEmailCC: this.fgCollector.get('cEmailCC').value,
            cShippingAddressOne: this.fgCollector.get('cShippingAddressOne').value,
            cShippingAddressTwo: this.fgCollector.get('cShippingAddressTwo').value,
            cShippingAddressThree: this.fgCollector.get('cShippingAddressThree').value,
            cShippingStreet: this.fgCollector.get('cShippingStreet').value,
            cShippingStreetNumber: this.fgCollector.get('cShippingStreetNumber').value,
            cShippingZip: this.fgCollector.get('cShippingZip').value,
            cShippingCity: this.fgCollector.get('cShippingCity').value,
            cShippingCountry: this.oShippingCountry
        };
        // send data
        this.connApi.safePost(this.urlSave, collector).subscribe((data) => {
            if (data.status == 200) {
                this.toastSaved();
            }
        }, error => {
            if (error.status == 406) {
                this.alertCollectorNameForgiven();
            }
        });
    }
    loadStates($kCountry) {
        this.connApi.safeGet(this.urlRegionStates + '/' + $kCountry).subscribe((response) => {
            this.lStates = response.body;
            // state
            this.lStates.forEach(state => {
                if (state.id == this.dataCollector.kState) {
                    this.oState = state;
                }
            });
        });
    }
    get errorControl() {
        return this.fgCollector.controls;
    }
    onToggleFormally($event) {
        if (!this.bChanged)
            this.bChanged = true;
        this.bFormally = $event['detail']['checked'];
    }
    compareAddress() {
        return (this.fgCollector.get('cName').value === this.fgCollector.get('cShippingAddressOne').value &&
            this.fgCollector.get('cNameDetails').value === this.fgCollector.get('cShippingAddressTwo').value &&
            'z.H. ' + this.fgCollector.get('cPrenamePerson').value + ' ' + this.fgCollector.get('cSurnamePerson').value === this.fgCollector.get('cShippingAddressThree').value &&
            this.fgCollector.get('cStreet').value === this.fgCollector.get('cShippingStreet').value &&
            this.fgCollector.get('cStreetNumber').value === this.fgCollector.get('cShippingStreetNumber').value &&
            this.fgCollector.get('cZip').value === this.fgCollector.get('cShippingZip').value &&
            this.fgCollector.get('cCity').value === this.fgCollector.get('cShippingCity').value &&
            this.oCountry === this.oShippingCountry);
    }
    onChangeAddress() {
        if (!this.bChanged)
            this.bChanged = true;
        if (this.bAddressIdentSelected) {
            this.fgCollector.controls['cShippingAddressOne'].setValue(this.fgCollector.get('cName').value);
            this.fgCollector.controls['cShippingAddressTwo'].setValue(this.fgCollector.get('cNameDetails').value);
            this.fgCollector.controls['cShippingAddressThree'].setValue('z.H. ' + this.fgCollector.get('cPrenamePerson').value + ' ' + this.fgCollector.get('cSurnamePerson').value);
            this.fgCollector.controls['cShippingStreet'].setValue(this.fgCollector.get('cStreet').value);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(this.fgCollector.get('cStreetNumber').value);
            this.fgCollector.controls['cShippingZip'].setValue(this.fgCollector.get('cZip').value);
            this.fgCollector.controls['cShippingCity'].setValue(this.fgCollector.get('cCity').value);
            this.oShippingCountry = this.oCountry;
        }
    }
    onChangeAddressIdent($event) {
        this.bAddressIdentSelected = $event['detail']['checked'];
        this.onChangeAddress();
    }
    // Toasts
    toastSaved() {
        return __awaiter(this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Deine Daten wurden erfolgreich gespeichert.',
                duration: 2500,
                cssClass: 'my-toast',
                position: 'middle'
            });
            yield toast.present();
        });
    }
    alertCollectorNameForgiven() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                header: 'Sammlername vergeben',
                message: 'Ihre Daten konnten nicht gespeichert werden. Bitte geben Sie einen anderen Sammlernamen ein.',
                cssClass: 'my-alert',
                buttons: ['Ok']
            });
            yield alert.present();
        });
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
    onPassword() {
        // prepare
        let data = {
            'role': 0,
            'email': this.fgCollector.get('cEmail').value
        };
        // send
        this.connApi.post(this.urlPasswordRequest, data).subscribe((data) => {
            if (data.status == 200) {
                this.alertCheckEmail();
            }
        }, error => {
            console.log(error);
        });
    }
    alertCheckEmail() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'E-Mail versendet',
                message: 'Bitte öffne die an Dich versendete E-Mail, um dein Passwort zurückzusetzen.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    onChange() {
        if (!this.bChanged)
            this.bChanged = true;
    }
};
MainPage = __decorate([
    Component({
        selector: 'app-main',
        templateUrl: './main.page.html',
        styleUrls: ['./main.page.scss'],
    })
], MainPage);
export { MainPage };
//# sourceMappingURL=main.page.js.map