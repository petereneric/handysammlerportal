import {Component, ElementRef, NgModule, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {ConnApiService} from '../../../../services/conn-api/conn-api.service';
import {AlertController, IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Toast} from '../../../../utilities/toast';
import {Downloads} from '../../../../utilities/downloads';
import {Alert} from '../../../../utilities/alert';
import {environment} from '../../../../../environments/environment';


@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.page.html',
    styleUrls: ['./registration-form.page.scss'],
    providers: [Downloads, Alert]
})

export class RegistrationFormPage implements OnInit {

    // Views
    @ViewChild('vName') vName;
    @ViewChild('vNameDetails') vNameDetails;
    @ViewChild('vStreet') vStreet;
    @ViewChild('vStreetNumber') vStreetNumber;
    @ViewChild('vCity') vCity;
    @ViewChild('vZip') vZip;
    @ViewChild('vPrename') vPrename;
    @ViewChild('vSurname') vSurname;
    @ViewChild('vEmail') vEmail;
    @ViewChild('vEmailCC') vEmailCC;
    @ViewChild('vPhoneFixedLine') vPhoneFixedLine;
    @ViewChild('vPhoneMobile') vPhoneMobile;
    @ViewChild('vShippingAddressOne') vShippingAddressOne;
    @ViewChild('vShippingAddressTwo') vShippingAddressTwo;
    @ViewChild('vShippingAddressThree') vShippingAddressThree;
    @ViewChild('vShippingStreet') vShippingStreet;
    @ViewChild('vShippingStreetNumber') vShippingStreetNumber;
    @ViewChild('vShippingZip') vShippingZip;
    @ViewChild('vShippingCity') vShippingCity;

    // Constants
    public maxZip = environment.maxZip;
    public maxInput = environment.maxInput;
    public maxPassword = environment.maxPassword;

    // ViewChilds
    private textArea: IonTextarea;

    // Urls
    private urlTypes = 'types';
    private urlRegionStates = 'region/states/';
    private urlRegionCountries = 'region/countries';
    private urlRegister = 'registration/collector';
    private urlPartner = 'partner';
    private urlPartners = 'partner'; // next update set partners, also change in api
    private urlBecomeCollector = 'download/document/become_collector';
    private urlMailRegistration = 'registration/mail';
    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    // FormBuilder
    fgCollector = this.fb.group({
        cName: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cNameDetails: ['', [Validators.maxLength(this.maxInput)]],
        cStreet: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cStreetNumber: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cZip: ['', [Validators.required, Validators.minLength(this.maxZip), Validators.maxLength(this.maxZip)]],
        cCity: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cPassword: ['', [Validators.required, Validators.pattern(environment.patternPassword), Validators.minLength(8)]],
        cPrename: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cSurname: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
        cEmailCC: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
        cPhoneFixedLine: ['', [Validators.maxLength(this.maxInput)]],
        cPhoneMobile: ['', [Validators.maxLength(this.maxInput)]],
        cShippingAddressOne: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cShippingAddressTwo: ['', [Validators.maxLength(this.maxInput)]],
        cShippingAddressThree: ['', [Validators.maxLength(this.maxInput)]],
        cShippingStreet: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cShippingCity: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cShippingZip: ['', [Validators.required, Validators.minLength(this.maxZip), Validators.maxLength(this.maxZip)]],
    });

    // Variables
    cType = null;
    oType = null;
    lTypes: any[] = [];
    lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
    oTitle = null;
    bPersonally: boolean = true;
    lCountries = [];
    oCountry = null;
    oShippingCountry = null;
    lStates = [];
    oState = null;
    lPartner: any[];
    oPartner = null;
    bPartnerAdmin: boolean = false;
    passwordIcon: string = 'eye-off';
    bPasswordIdentical: Boolean;

    bSubmitted: boolean = false;
    bAddressIdentical: boolean = false;
    bShowPassword: boolean = false;
    bChangePartner = true;
    bConditions = false;
    bSecurity = false;

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    compareWith = this.compareWithFn;

// private activatedRoute: ActivatedRoute
    constructor(public Downloads: Downloads, private uToast: Toast, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private connApi: ConnApiService, public alertController: AlertController, public router: Router) {

    }

    ngOnInit() {
        //this.fgCollector.controls['cName'].setValue('test'); Hat keinen Einfluss
        // types
        this.connApi.get(this.urlTypes).subscribe((data: HttpResponse<any>) => {
            this.lTypes = data.body;
        });

        // partner
        this.connApi.get(this.urlPartners).subscribe((response: HttpResponse<any>) => {
            this.lPartner = response.body;
        });

        this.activatedRoute.params.subscribe(params => {
            if (params.id != null && params.id != 0) {
                this.connApi.get(this.urlPartner + '/' + params.id).subscribe((response: HttpResponse<any>) => {
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
        this.connApi.get(this.urlRegionCountries).subscribe((response: HttpResponse<any>) => {
            console.log(response);
            this.lCountries = response.body;
            this.oCountry = this.lCountries[0];
            this.oShippingCountry = this.lCountries[0];
            this.loadStates(this.oCountry.id);
        });
    }

    getFormValidationErrors() {
        Object.keys(this.fgCollector.controls).forEach(key => {

            const controlErrors: ValidationErrors = this.fgCollector.get(key).errors;
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

        let collector =
            {
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

        this.connApi.post(this.urlRegister, collector).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                console.log(data);
                this.uToast.successfulRegistration();
                //this.mailVerification()
                localStorage.setItem('token', null);
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

    private mailVerification() {
        this.connApi.safePost(this.urlMailRegistration, null).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                console.log('Verification mail sent');
            }
        }, error => {
            console.log(error.message);
        });
    }

    // Address

    onChangeAddress() {
        if (this.bAddressIdentical) {
            console.log('läuft');
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

    onAddress($event: any) {
        this.bAddressIdentical = $event['detail']['checked'];
        this.onChangeAddress();
    }

    onChangeCondtions($event: any) {
        this.bConditions = $event['detail']['checked'];
    }

    onChangeSecurity($event: any) {
        this.bSecurity = $event['detail']['checked'];
    }

    // Load
    loadStates($kCountry) {
        this.connApi.get(this.urlRegionStates + $kCountry).subscribe((response: HttpResponse<any>) => {
            this.lStates = response.body;
            console.log(response.body);
        });
    }

    get errorControl() {
        return this.fgCollector.controls;
    }

    // Alert

    async alertPasswordNotIdentical() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Passwort',
            subHeader: 'Passwörter stimmen nicht überein',
            message: 'Bitte geben Sie beide Passwörter erneut ein.',
            buttons: ['ok']
        });

        await alert.present();
    }

    async alertEmailNotIdentical() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'E-Mail',
            subHeader: 'E-Mail Adressen stimmen nicht überein',
            message: 'Bitte geben Sie beide E-Mail Adressen erneut ein. Die E-Mail Adresse in CC ist selbstverständlich eine andere wenn vorhanden.',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertPasswordTooShort() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Passwort',
            subHeader: 'Passwort zu kurz',
            message: 'Bitte geben Sie ein Passwort mit mindestens 8 Zeichen ein',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertCollectorNameForgiven() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            subHeader: 'Sammlername vergeben',
            message: 'Dieser Sammler existiert bereits - Eine Registrierung ist daher nicht möglich.',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertEmailForgiven() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            subHeader: 'E-Mail Adresse vergeben',
            message: 'Bitte gib eine andere E-Mail Adresse ein.',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertMax() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Registrierung',
            subHeader: 'Limit überschritten',
            message: 'Leider wurde für heute das Limit möglicher Registrierungen überschritten. Bitte probiere es morgen erneut.',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertInvalid() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
            buttons: ['Ok']
        });

        await alert.present();
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
        let regex = new RegExp('(?=.*[§#@$!%*?&<>])');
        return regex.test(this.fgCollector.get('cPassword').value);
    }

    changeConditions() {
        this.bConditions = !this.bConditions;
    }

    changeSecurity() {
        this.bSecurity = !this.bSecurity;
    }

    onInfo() {
        console.log('test');
        this.connApi.getFile(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            console.log(error);
        });
    }

    onTermsOfUse() {
        this.Downloads.termsOfUseCollector();
    }

    onPrivacyPolicy() {
        this.Downloads.privacyPolicyCollector();
    }

    ngAfterViewInit() {
        this.vName.ionChange.subscribe(() => {
            this.vName.autoGrow = true;
        });
        this.vNameDetails.ionChange.subscribe(() => {
            console.log("hiiddddier");
            this.vNameDetails.autoGrow = true;
        });
        this.vStreet.ionChange.subscribe(() => {
            if (this.vStreet.autoGrow == false) {
                this.vStreet.autoGrow = true;
            }
        });
        this.vStreetNumber.ionChange.subscribe(() => {
            if (this.vStreetNumber.autoGrow == false) {
                this.vStreetNumber.autoGrow = true;
            }
        });
        this.vCity.ionChange.subscribe(() => {
            if (this.vCity.autoGrow == false) {
                this.vCity.autoGrow = true;
            }
        });
        this.vZip.ionChange.subscribe(() => {
            if (this.vZip.autoGrow == false) {
                this.vZip.autoGrow = true;
            }
        });
        this.vPrename.ionChange.subscribe(() => {
            if (this.vPrename.autoGrow == false) {
                this.vPrename.autoGrow = true;
            }
        });
        this.vSurname.ionChange.subscribe(() => {
            if (this.vSurname.autoGrow == false) {
                this.vSurname.autoGrow = true;
            }
        });
        this.vEmail.ionChange.subscribe(() => {
            if (this.vEmail.autoGrow == false) {
                this.vEmail.autoGrow = true;
            }
        });
        this.vEmailCC.ionChange.subscribe(() => {
            if (this.vEmailCC.autoGrow == false) {
                this.vEmailCC.autoGrow = true;
            }
        });
        this.vPhoneFixedLine.ionChange.subscribe(() => {
            if (this.vPhoneFixedLine.autoGrow == false) {
                this.vPhoneFixedLine.autoGrow = true;
            }
        });
        this.vPhoneMobile.ionChange.subscribe(() => {
            if (this.vPhoneMobile.autoGrow == false) {
                this.vPhoneMobile.autoGrow = true;
            }
        });
        this.vShippingAddressOne.ionChange.subscribe(() => {
            if (this.vShippingAddressOne.autoGrow == false) {
                this.vShippingAddressOne.autoGrow = true;
            }
        });
        this.vShippingAddressTwo.ionChange.subscribe(() => {
            if (this.vShippingAddressTwo.autoGrow == false) {
                this.vShippingAddressTwo.autoGrow = true;
            }
        });
        this.vShippingAddressThree.ionChange.subscribe(() => {
            if (this.vShippingAddressThree.autoGrow == false) {
                this.vShippingAddressThree.autoGrow = true;
            }
        });
        this.vShippingStreet.ionChange.subscribe(() => {
            if (this.vShippingStreet.autoGrow == false) {
                this.vShippingStreet.autoGrow = true;
            }
        });
        this.vShippingStreetNumber.ionChange.subscribe(() => {
            if (this.vShippingStreetNumber.autoGrow == false) {
                this.vShippingStreetNumber.autoGrow = true;
            }
        });
        this.vShippingZip.ionChange.subscribe(() => {
            if (this.vShippingZip.autoGrow == false) {
                this.vShippingZip.autoGrow = true;
            }
        });
        this.vShippingCity.ionChange.subscribe(() => {
            if (this.vShippingCity.autoGrow == false) {
                this.vShippingCity.autoGrow = true;
            }
        });
    }
}
