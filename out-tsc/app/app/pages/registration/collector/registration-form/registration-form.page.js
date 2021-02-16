import { __awaiter, __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let RegistrationFormPage = class RegistrationFormPage {
    // private activatedRoute: ActivatedRoute
    constructor(activatedRoute, fb, connApi, alertController, router) {
        this.activatedRoute = activatedRoute;
        this.fb = fb;
        this.connApi = connApi;
        this.alertController = alertController;
        this.router = router;
        // Urls
        this.urlTypeNames = 'types';
        this.urlRegionStates = 'region/states/';
        this.urlRegionCountries = 'region/countries';
        this.urlRegister = 'registration/collector';
        this.urlPartner = 'partner';
        this.urlBecomeCollector = "download/document/become_collector";
        this.urlMailRegistration = "collector/registration/mail";
        // FormBuilder
        this.fgCollector = this.fb.group({
            cName: ['', [Validators.required, Validators.maxLength(80)]],
            cNameDetails: ['', [Validators.maxLength(50)]],
            cStreet: ['', [Validators.required, Validators.maxLength(50)]],
            cStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
            cZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
            cCity: ['', [Validators.required, Validators.maxLength(50)]],
            cPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(8)]],
            cPrename: ['', [Validators.required, Validators.maxLength(50)]],
            cSurname: ['', [Validators.required, Validators.maxLength(50)]],
            cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cEmailCC: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(80)]],
            cPhoneFixedLine: ['', [Validators.maxLength(50)]],
            cPhoneMobile: ['', [Validators.maxLength(50)]],
            cShippingAddressOne: ['', [Validators.required, Validators.maxLength(50)]],
            cShippingAddressTwo: ['', [Validators.maxLength(50)]],
            cShippingAddressThree: ['', [Validators.maxLength(50)]],
            cShippingStreet: ['', [Validators.required, Validators.maxLength(50)]],
            cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
            cShippingCity: ['', [Validators.required, Validators.maxLength(50)]],
            cShippingZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        });
        // Variables
        this.cType = null;
        this.oType = null;
        this.lTypes = [];
        this.lTitles = [{ cName: 'Herr' }, { cName: 'Frau' }, { cName: 'Herr Dr.' }, { cName: 'Frau Dr.' },];
        this.oTitle = null;
        this.bPersonally = true;
        this.lCountries = [];
        this.oCountry = null;
        this.oShippingCountry = null;
        this.lStates = [];
        this.oState = null;
        this.oPartner = null;
        this.bPartnerAdmin = false;
        this.passwordIcon = 'eye-off';
        this.bSubmitted = false;
        this.bAddressIdentical = false;
        this.bShowPassword = false;
        this.bChangePartner = true;
        this.bConditions = false;
        this.bSecurity = false;
        this.compareWithFn = (o1, o2) => {
            return o1 && o2 ? o1.id === o2.id : o1 === o2;
        };
        this.compareWith = this.compareWithFn;
    }
    ngOnInit() {
        // types
        this.connApi.get(this.urlTypeNames).subscribe((data) => {
            this.lTypes = data.body;
        });
        // partner
        this.connApi.get(this.urlPartner).subscribe((response) => {
            this.lPartner = response.body;
        });
        this.activatedRoute.params.subscribe(params => {
            if (params.id != null && params.id != 0) {
                this.connApi.get(this.urlPartner + '/' + params.id).subscribe((response) => {
                    if (response.body != null) {
                        this.oPartner = response.body;
                        this.bChangePartner = false;
                    }
                }, error => {
                    console.log(error);
                });
            }
        });
        // region
        this.connApi.get(this.urlRegionCountries).subscribe((response) => {
            console.log(response);
            this.lCountries = response.body;
            this.oCountry = this.lCountries[0];
            this.oShippingCountry = this.lCountries[0];
            this.loadStates(this.oCountry.id);
        });
    }
    getFormValidationErrors() {
        Object.keys(this.fgCollector.controls).forEach(key => {
            const controlErrors = this.fgCollector.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
    }
    register() {
        this.bSubmitted = true;
        // check for invalid input
        if (!this.fgCollector.valid || this.oType == null || this.oState == null || this.oCountry == null || this.oShippingCountry == null || this.oTitle == null || this.oPartner == null) {
            this.getFormValidationErrors();
            this.alertInvalid();
            return;
        }
        let collector = {
            cName: this.fgCollector.get('cName').value,
            cNameDetails: this.fgCollector.get('cNameDetails').value,
            cStreet: this.fgCollector.get('cStreet').value,
            cStreetNumber: this.fgCollector.get('cStreetNumber').value,
            cZip: this.fgCollector.get('cZip').value,
            cCity: this.fgCollector.get('cCity').value,
            kState: this.oState.id,
            kCountry: this.oCountry.id,
            cPassword: this.fgCollector.get('cPassword').value,
            kType: this.oType.id,
            cSurname: this.fgCollector.get('cSurname').value,
            cPrename: this.fgCollector.get('cPrename').value,
            bFormally: !this.bPersonally ? 1 : 0,
            cTitle: this.oTitle.cName,
            cEmail: this.fgCollector.get('cEmail').value,
            cEmailCC: this.fgCollector.get('cEmailCC').value,
            cPhoneFixedLine: this.fgCollector.get('cPhoneFixedLine').value,
            cPhoneMobile: this.fgCollector.get('cPhoneMobile').value,
            cShippingAddressOne: this.fgCollector.get('cShippingAddressOne').value,
            cShippingAddressTwo: this.fgCollector.get('cShippingAddressTwo').value,
            cShippingAddressThree: this.fgCollector.get('cShippingAddressThree').value,
            cShippingStreet: this.fgCollector.get('cShippingStreet').value,
            cShippingStreetNumber: this.fgCollector.get('cShippingStreetNumber').value,
            cShippingCity: this.fgCollector.get('cShippingCity').value,
            cShippingZip: this.fgCollector.get('cShippingZip').value,
            kShippingCountry: this.oCountry.id,
            kPartner: this.oPartner.id
        };
        console.log(collector);
        this.connApi.post(this.urlRegister, collector).subscribe((data) => {
            if (data.status == 200) {
                console.log(data);
                this.mailVerification();
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 406) {
                this.alertCollectorNameForgiven();
            }
            if (error.status == 409) {
                this.alertCollectorNameForgiven();
            }
            if (error.status == 429) {
                this.alertMax();
            }
        });
    }
    onToggleFormally($event) {
        console.log($event['detail']['checked']);
        //this.bFormally = !$event['detail']['checked'];
    }
    showPassword() {
        this.bShowPassword = !this.bShowPassword;
    }
    mailVerification() {
        this.connApi.safePost(this.urlMailRegistration, null).subscribe((data) => {
            if (data.status == 200) {
                console.log("Verification mail sent");
            }
        }, error => {
            console.log(error.message);
        });
    }
    // Address
    onChangeAddress() {
        if (this.bAddressIdentical) {
            console.log("läuft");
            this.fgCollector.controls['cShippingAddressOne'].setValue(this.fgCollector.get('cName').value);
            this.fgCollector.controls['cShippingAddressTwo'].setValue(this.fgCollector.get('cNameDetails').value);
            this.fgCollector.controls['cShippingAddressThree'].setValue((this.fgCollector.get('cPrename').value !== '' && this.fgCollector.get('cSurname').value !== '') ? 'z.H. ' + this.fgCollector.get('cPrename').value + ' ' + this.fgCollector.get('cSurname').value : '');
            this.fgCollector.controls['cShippingStreet'].setValue(this.fgCollector.get('cStreet').value);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(this.fgCollector.get('cStreetNumber').value);
            this.fgCollector.controls['cShippingZip'].setValue(this.fgCollector.get('cZip').value);
            this.fgCollector.controls['cShippingCity'].setValue(this.fgCollector.get('cCity').value);
            this.oShippingCountry = this.oCountry;
        }
    }
    onAddress($event) {
        this.bAddressIdentical = $event['detail']['checked'];
        this.onChangeAddress();
    }
    onChangeCondtions($event) {
        this.bConditions = $event['detail']['checked'];
    }
    onChangeSecurity($event) {
        this.bSecurity = $event['detail']['checked'];
    }
    // Load
    loadStates($kCountry) {
        this.connApi.get(this.urlRegionStates + $kCountry).subscribe((response) => {
            this.lStates = response.body;
            console.log(response.body);
        });
    }
    get errorControl() {
        return this.fgCollector.controls;
    }
    // Alerts
    alertPasswordNotIdentical() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Passwort',
                subHeader: 'Passwörter stimmen nicht überein',
                message: 'Bitte geben Sie beide Passwörter erneut ein.',
                buttons: ['ok']
            });
            yield alert.present();
        });
    }
    alertEmailNotIdentical() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'E-Mail',
                subHeader: 'E-Mail Adressen stimmen nicht überein',
                message: 'Bitte geben Sie beide E-Mail Adressen erneut ein. Die E-Mail Adresse in CC ist selbstverständlich eine andere wenn vorhanden.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertPasswordTooShort() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Passwort',
                subHeader: 'Passwort zu kurz',
                message: 'Bitte geben Sie ein Passwort mit mindestens 8 Zeichen ein',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertCollectorNameForgiven() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                subHeader: 'Sammlername vergeben',
                message: 'Dieser Sammler existiert bereits - Eine Registrierung ist daher nicht möglich.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertEmailForgiven() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                subHeader: 'E-Mail Adresse vergeben',
                message: 'Bitte gib eine andere E-Mail Adresse ein.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertMax() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Registrierung',
                subHeader: 'Limit überschritten',
                message: 'Leider wurde für heute das Limit möglicher Registrierungen überschritten. Bitte probiere es morgen erneut.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    alertInvalid() {
        return __awaiter(this, void 0, void 0, function* () {
            const alert = yield this.alertController.create({
                cssClass: 'my-alert',
                header: 'Ungültige Eingabe',
                message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
                buttons: ['Ok']
            });
            yield alert.present();
        });
    }
    onRegister() {
    }
    // Password
    passwordInactive() {
        return this.fgCollector.get('cPassword').value.length == 0;
    }
    passwordLength() {
        return this.fgCollector.get('cPassword').value.length >= 8;
    }
    passwordBigSmall() {
        let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
        return regex.test(this.fgCollector.get('cPassword').value);
    }
    passwordNumber() {
        let regex = new RegExp('(?=.*[1-9])');
        return regex.test(this.fgCollector.get('cPassword').value);
    }
    passwordExtra() {
        let regex = new RegExp('(?=.*[§#@$!%*?&])');
        return regex.test(this.fgCollector.get('cPassword').value);
    }
    changeConditions() {
        this.bConditions = !this.bConditions;
    }
    changeSecurity() {
        this.bSecurity = !this.bSecurity;
    }
    onInfo() {
        console.log("test");
        this.connApi.getPDF(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }
    onConditions() {
    }
    onSecurity() {
    }
};
RegistrationFormPage = __decorate([
    Component({
        selector: 'app-registration-form',
        templateUrl: './registration-form.page.html',
        styleUrls: ['./registration-form.page.scss'],
    })
], RegistrationFormPage);
export { RegistrationFormPage };
//# sourceMappingURL=registration-form.page.js.map