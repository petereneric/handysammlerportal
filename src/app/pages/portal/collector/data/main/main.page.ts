import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {element} from 'protractor';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-main',
    templateUrl: './main.page.html',
    styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

    // Urls
    private urlCollector = 'collector/main';
    private urlTypes = 'types';
    private urlSave = 'collector/main';
    private urlRegionStates = 'region/states';
    private urlRegionCountries = 'region/countries';
    private urlPasswordRequest = "password/request"

    // IdentAddress
    bAddressIdentSelected: boolean;

    // FormBuilder
    fgCollector = this.formBuilder.group({
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

    // Variables
    dataCollector;
    oType = null;
    lTypes: any[] = [];
    oTitle = null;
    lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
    bFormally: boolean = true;
    oCountry: null;
    oState = null;
    oShippingCountry: null;
    lCountries: any[] = [];
    lStates = [];
    bSubmitted = false;
    bChanged: boolean;

    constructor(private connApi: ConnApiService, private formBuilder: FormBuilder, public toastController: ToastController, public alertController: AlertController) {
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
            this.connApi.safeGet(this.urlTypes).subscribe((data: HttpResponse<any>) => {
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
            this.connApi.get(this.urlRegionCountries).subscribe((response: HttpResponse<any>) => {
                console.log(response);
                this.lCountries = response.body;
                this.lCountries.forEach(country => {
                    if (country.id == collector.kCountry) {
                        this.oCountry = country;
                    }
                    if (country.id == collector.kShippingCountry) {
                        this.oShippingCountry = country;
                    }
                })

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
            console.log(this.oType);
            console.log(this.oCountry);
            console.log(this.oShippingCountry);
            console.log(this.oTitle);
            this.alertInvalid();
            return;
        }

        // prepare data
        let kType = this.oType.id;
        let collector =
            {
                cName: this.fgCollector.get('cName').value,
                cNameDetails: this.fgCollector.get('cNameDetails').value,
                kType: kType,
                cStreet: this.fgCollector.get('cStreet').value,
                cStreetNumber: this.fgCollector.get('cStreetNumber').value,
                cZip: this.fgCollector.get('cZip').value,
                cCity: this.fgCollector.get('cCity').value,
                // @ts-ignore
                kCountry: this.oCountry.id,
                // @ts-ignore
                kState: this.oState.id,
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
                // @ts-ignore
                kShippingCountry: this.oShippingCountry.id
            };

        // send data
        this.connApi.safePost(this.urlSave, collector).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                this.toastSaved();
            }
        }, error => {
            console.log(error);
            if (error.status == 406) {
                this.alertCollectorNameForgiven();
            }
        });

    }

    loadStates() {
        if (this.oCountry != null) {
            // @ts-ignore
            let kCountry = this.oCountry!.id;
            this.connApi.safeGet(this.urlRegionStates+'/'+kCountry).subscribe((response : HttpResponse<any>) => {
                this.lStates = response.body
                console.log(this.lStates);

                // state
                this.lStates.forEach(state => {
                    if (state.id == this.dataCollector.kState) {
                        this.oState = state;
                    }
                })
            }, error => {
                console.log(error);
            })
        }
    }

    get errorControl() {
        return this.fgCollector.controls;
    }

    onToggleFormally($event: any) {
        if (!this.bChanged) this.bChanged = true;
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
        if (!this.bChanged) this.bChanged = true;

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

    onChangeAddressIdent($event: any) {
        this.bAddressIdentSelected = $event['detail']['checked'];
        this.onChangeAddress();
    }

    // Toasts
    async toastSaved() {
        const toast = await this.toastController.create({
            message: 'Deine Daten wurden erfolgreich gespeichert.',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }

    async alertCollectorNameForgiven() {
        const alert = await this.alertController.create({
            header: 'Sammlername vergeben',
            message: 'Ihre Daten konnten nicht gespeichert werden. Bitte geben Sie einen anderen Sammlernamen ein.',
            cssClass: 'my-alert',
            buttons: ['Ok']
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

    onPassword() {
        // prepare
        let data = {
            'role': 0,
            'email':this.fgCollector.get('cEmail').value
        }

        // send
        this.connApi.post(this.urlPasswordRequest, data).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                this.alertCheckEmail();
            }
        }, error => {
            console.log(error)
        });
    }

    async alertCheckEmail() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'E-Mail versendet',
            message: 'Bitte öffne die an Dich versendete E-Mail, um dein Passwort zurückzusetzen.',
            buttons: ['Ok']
        });

        await alert.present();
    }

    onChange() {
        if (!this.bChanged) this.bChanged = true;
    }

    onChangeCountry() {
        this.onChangeAddress();
        this.loadStates();
    }
}
