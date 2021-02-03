import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConnApiService} from '../../../../services/conn-api/conn-api.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.page.html',
    styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {

    // Urls
    private urlTypeNames = 'collector/types';
    private urlRegionStates = 'collector/region/states';
    private urlRegister = 'registration/collector'

    // FormBuilder
    fgCollector = this.fb.group({
        cName: ['', [Validators.required, Validators.maxLength(50)]],
        cNameDetails: ['', [Validators.maxLength(50)]],
        cStreet: ['', [Validators.required, Validators.maxLength(50)]],
        cStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
        cZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        cCity: ['', [Validators.required, Validators.maxLength(50)]],
        cPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'), Validators.minLength(8)]],
        cPasswordCheck: ['', [Validators.required]],
        cPrename: ['', [Validators.required, Validators.maxLength(50)]],
        cSurname: ['', [Validators.required, Validators.maxLength(50)]],
        cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
        cEmailCheck: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
        cEmailCC: ['', [Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
        cPhoneFixedLine: ['', [Validators.maxLength(50)]],
        cPhoneMobile: ['', [Validators.maxLength(50)]],
        cShippingNameOne: ['', [Validators.required, Validators.maxLength(50)]],
        cShippingNameTwo: ['', [Validators.maxLength(50)]],
        cShippingNameThree: ['', [Validators.maxLength(50)]],
        cShippingStreet: ['', [Validators.required, Validators.maxLength(50)]],
        cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
        cShippingCity: ['', [Validators.required, Validators.maxLength(50)]],
        cShippingZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
    });

    // Variables
    cType = null
    oType = null;
    lTypes: any[] = [];
    lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
    cTitle: string = null;
    bFormally: boolean = true;
    lCountries: any[] = [{id: 1, cName: 'Deutschland'}];
    oCountry = this.lCountries[0];
    cCountry = null;
    oShippingCountry = this.lCountries[0];
    cShippingCountry = null;
    lStates = [];
    oState = null;
    cState = null;
    lPartner: any[];
    oPartner = null;
    cPartner = null;
    kPartner: number;
    bPartnerAdmin: boolean = false;
    passwordIcon: string = 'eye-off';
    bPasswordIdentical: Boolean;

    bSubmitted: boolean = false;
    bAddressIdentSelected: boolean;
    bShowPassword: boolean = false;
    bChangePartner = true;
    bConditions = false;
    bSecurity = false;

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    compareWith = this.compareWithFn;


    constructor(private fb: FormBuilder, private connApi: ConnApiService, public alertController: AlertController, public router: Router) {
    }

    ngOnInit() {
        // types
        this.connApi.safeGet(this.urlTypeNames).subscribe((data: HttpResponse<any>) => {
            this.lTypes = data.body;
        });

        // listPartner
        this.connApi.get(ConnApiService.getPartnerRegistration).subscribe((data: HttpResponse<any>) =>
            this.lPartner = data.body['lPartner']);

        // states
        this.loadStates(this.oCountry.id);
    }

    register() {
        this.bSubmitted = true;

        // check for invalid input
        if (!this.fgCollector.valid || this.oType == null || this.oCountry == null || this.oShippingCountry == null || this.cTitle == null) {
            this.alertInvalid();
            return;
        }

        // check if password identical
        if (this.fgCollector.get('cPassword').value !== this.fgCollector.get('cPasswordCheck').value) {
            this.alertPasswordNotIdentical();
            return;
        }
        if (this.fgCollector.get('cEmail').value !== this.fgCollector.get('cEmailCheck').value) {
            this.alertEmailNotIdentical();
            return;
        }

        let collector =
            {
                cName: this.fgCollector.get('cName').value,
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
                bFormally: this.bFormally ? 1 : 0,
                cTitle: this.cTitle,
                cEmail: this.fgCollector.get('cEmail').value,
                cEmailCC: this.fgCollector.get('cEmailCC').value,
                cPhoneFixedLine: this.fgCollector.get('cPhoneFixedLine').value,
                cPhoneMobile: this.fgCollector.get('cPhoneMobile').value,
                cShippingAddressOne: this.fgCollector.get('cShippingAddressOne').value,
                cShippingAddressTwo: this.fgCollector.get('cShippingAddressTwo').value,
                cShippingStreet: this.fgCollector.get('cShippingStreet').value,
                cShippingStreetNumber: this.fgCollector.get('cShippingStreetNumber').value,
                cShippingCity: this.fgCollector.get('cShippingCity').value,
                cShippingZip: this.fgCollector.get('cShippingZip').value,
                cShippingCountry: this.oCountry.cName,
                kPartner: this.kPartner,
                bPartnerAdmin: this.bPartnerAdmin ? 1 : 0
            };
        console.log(collector);

        this.connApi.post(this.urlRegister, collector).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                console.log(data);
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 406) {
                this.alertCollectorNameForgiven();
            }
        });
    }

    onToggleFormally($event) {
        this.bFormally = $event['detail']['checked'];
    }

    onTogglePartnerAdmin($event) {
        this.bPartnerAdmin = $event['detail']['checked'];
    }

    showPassword() {
        this.bShowPassword = !this.bShowPassword;
    }

    // Address

    compareAddress() {
        return (this.fgCollector.get('cName').value === this.fgCollector.get('cShippingNameOne').value &&
            this.fgCollector.get('cNameDetails').value === this.fgCollector.get('cShippingNameTwo').value &&
            'z.H. ' + this.fgCollector.get('cPrenamePerson').value + ' ' + this.fgCollector.get('cSurnamePerson').value === this.fgCollector.get('cShippingNameThree').value &&
            this.fgCollector.get('cStreet').value === this.fgCollector.get('cShippingStreet').value &&
            this.fgCollector.get('cStreetNumber').value === this.fgCollector.get('cShippingStreetNumber').value &&
            this.fgCollector.get('cZip').value === this.fgCollector.get('cShippingZip').value &&
            this.fgCollector.get('cCity').value === this.fgCollector.get('cShippingCity').value &&
            this.oCountry.cName === this.oShippingCountry.cName);
    }

    onChangeAddress() {
        if (this.bAddressIdentSelected) {
            this.fgCollector.controls['cShippingNameOne'].setValue(this.fgCollector.get('cName').value);
            this.fgCollector.controls['cShippingNameTwo'].setValue(this.fgCollector.get('cNameDetails').value);
            this.fgCollector.controls['cShippingNameThree'].setValue('z.H. ' + this.fgCollector.get('cPrenamePerson').value + ' ' + this.fgCollector.get('cSurnamePerson').value);
            this.fgCollector.controls['cShippingStreet'].setValue(this.fgCollector.get('cStreet').value);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(this.fgCollector.get('cStreetNumber').value);
            this.fgCollector.controls['cShippingZip'].setValue(this.fgCollector.get('cZip').value);
            this.fgCollector.controls['cShippingCity'].setValue(this.fgCollector.get('cCity').value);
            this.oShippingCountry = this.oCountry;
        }
    }

    onChangeAddressIdent($event: any) {
        this.bAddressIdentSelected = $event['detail']['checked'];
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
        this.connApi.safeGet(this.urlRegionStates+'/'+$kCountry).subscribe((response : HttpResponse<any>) => {
            this.lStates = response.body
            console.log(response.body);
        })
    }

    get errorControl() {
        return this.fgCollector.controls;
    }

    // Alerts

    async alertPasswordNotIdentical() {
        const alert = await this.alertController.create({
            //cssClass: 'my-custom-class',
            header: 'Passwort',
            subHeader: 'Passwörter stimmen nicht überein',
            message: 'Bitte geben Sie beide Passwörter erneut ein.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async alertEmailNotIdentical() {
        const alert = await this.alertController.create({
            //cssClass: 'my-custom-class',
            header: 'E-Mail',
            subHeader: 'E-Mail Adressen stimmen nicht überein',
            message: 'Bitte geben Sie beide E-Mail Adressen erneut ein. Die E-Mail Adresse in CC ist selbstverständlich eine andere wenn vorhanden.',
            buttons: ['OK']
        });
        await alert.present();
    }

    async alertPasswordTooShort() {
        const alert = await this.alertController.create({
            //cssClass: 'my-custom-class',
            header: 'Passwort',
            subHeader: 'Passwort zu kurz',
            message: 'Bitte geben Sie ein Passwort mit mindestens 8 Zeichen ein',
            buttons: ['OK']
        });
        await alert.present();
    }

    async alertCollectorNameForgiven() {
        const alert = await this.alertController.create({
            //cssClass: 'my-custom-class',
            header: 'Sammlername',
            subHeader: 'Sammlername vergeben',
            message: 'Bitte geben Sie einen neuen Sammlernamen ein',
            buttons: ['OK']
        });
        await alert.present();
    }

    async alertInvalid() {
        const alert = await this.alertController.create({
            header: 'Fehlerhafte Eingabe',
            message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
            cssClass: 'my-alert',
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
        let regex = new RegExp('(?=.*[§#@$!%*?&])');
        return regex.test(this.fgCollector.get('cPassword').value);
    }
}
