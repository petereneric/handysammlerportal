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
    private urlTypeNames = 'collector/type-names';
    private urlSave = 'collector/main';

    // IdentAddress
    bAddressIdentSelected: boolean;

    // FormBuilder
    fgCollector = this.formBuilder.group({
        cName: ['', [Validators.required, Validators.maxLength(50)]],
        cNameDetails: ['', [Validators.maxLength(50)]],
        cStreet: ['', [Validators.required, Validators.maxLength(50)]],
        cStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
        cZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        cCity: ['', [Validators.required, Validators.maxLength(50)]],
        cPrenamePerson: ['', [Validators.required, Validators.maxLength(50)]],
        cSurnamePerson: ['', [Validators.required, Validators.maxLength(50)]],
        cPhoneFixedLine: ['', [Validators.maxLength(50)]],
        cPhoneMobile: ['', [Validators.maxLength(50)]],
        cEmail: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
        cEmailCC: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
        cShippingNameOne: ['', [Validators.required, Validators.maxLength(50)]],
        cShippingNameTwo: ['', [Validators.maxLength(50)]],
        cShippingNameThree: ['', [Validators.maxLength(50)]],
        cShippingStreet: ['', [Validators.required, Validators.maxLength(50)]],
        cShippingStreetNumber: ['', [Validators.required, Validators.maxLength(10)]],
        cShippingZip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        cShippingCity: ['', [Validators.required, Validators.maxLength(50)]],
    });

    // Variables
    cType = null;
    lTypes: any[] = [];
    cTitle = null;
    lTitles: any[] = [{cName: 'Herr'}, {cName: 'Frau'}, {cName: 'Herr Dr.'}, {cName: 'Frau Dr.'},];
    bFormally: boolean = true;
    cCountry: null;
    cShippingCountry: null;
    lCountries: any[] = [{cName: 'Deutschland'}];
    bSubmitted = false;

    constructor(private connApi: ConnApiService, private formBuilder: FormBuilder, public toastController: ToastController, public alertController: AlertController) {
    }

    ngOnInit() {
        // types
        this.connApi.safeGet(this.urlTypeNames).subscribe((data: HttpResponse<any>) => {
            this.lTypes = data.body;
        });

        // collector
        this.connApi.safeGet(this.urlCollector).subscribe((response) => {
            let collector = response.body;

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
            this.fgCollector.controls['cShippingNameOne'].setValue(collector.cShippingNameOne);
            this.fgCollector.controls['cShippingNameTwo'].setValue(collector.cShippingNameTwo);
            this.fgCollector.controls['cShippingNameThree'].setValue(collector.cShippingNameThree);
            this.fgCollector.controls['cShippingStreet'].setValue(collector.cShippingStreet);
            this.fgCollector.controls['cShippingStreetNumber'].setValue(collector.cShippingStreetNumber);
            this.fgCollector.controls['cShippingZip'].setValue(collector.cShippingZip);
            this.fgCollector.controls['cShippingCity'].setValue(collector.cShippingCity);

            // type
            this.lTypes.forEach((element) => {
                if (collector.cType === element.cName) {
                    this.cType = collector.cType;
                }
            });

            // title
            this.cTitle = collector.cTitlePerson;

            // formally
            this.bFormally = collector.bAddressFormally;

            // country
            this.cCountry = collector.cCountry;

            // shippingCountry
            this.cShippingCountry = collector.cShippingCountry;

            // addressIdentical
            this.bAddressIdentSelected = this.compareAddress();
        });
    }

    onSave() {
        this.bSubmitted = true;

        // check for invalid input
        if (!this.fgCollector.valid || this.cType == null || this.cCountry == null || this.cShippingCountry == null || this.cTitle == null) {
            this.alertInvalid();
            return;
        }

        // prepare data
        let kType: number;
        this.lTypes.forEach((element) => {
            if (element.cName === this.cType) {
                kType = element.id;
            }
        });
        let collector =
            {
                cName: this.fgCollector.get('cName').value,
                cNameDetails: this.fgCollector.get('cNameDetails').value,
                kType: kType,
                cStreet: this.fgCollector.get('cStreet').value,
                cStreetNumber: this.fgCollector.get('cStreetNumber').value,
                cZip: this.fgCollector.get('cZip').value,
                cCity: this.fgCollector.get('cCity').value,
                cCountry: this.cCountry,
                cPrenamePerson: this.fgCollector.get('cPrenamePerson').value,
                cSurnamePerson: this.fgCollector.get('cSurnamePerson').value,
                cTitle: this.cTitle,
                bAddressFormally: this.bFormally ? 1 : 0,
                cPhoneFixedLine: this.fgCollector.get('cPhoneFixedLine').value,
                cPhoneMobile: this.fgCollector.get('cPhoneMobile').value,
                cEmail: this.fgCollector.get('cEmail').value,
                cEmailCC: this.fgCollector.get('cEmailCC').value,
                cShippingNameOne: this.fgCollector.get('cShippingNameOne').value,
                cShippingNameTwo: this.fgCollector.get('cShippingNameTwo').value,
                cShippingNameThree: this.fgCollector.get('cShippingNameThree').value,
                cShippingStreet: this.fgCollector.get('cShippingStreet').value,
                cShippingStreetNumber: this.fgCollector.get('cShippingStreetNumber').value,
                cShippingZip: this.fgCollector.get('cShippingZip').value,
                cShippingCity: this.fgCollector.get('cShippingCity').value,
                cShippingCountry: this.cShippingCountry
            };

        // send data
        this.connApi.safePost(this.urlSave, collector).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                this.toastSaved();
            }
        }, error => {
            if (error.status == 406) {
                this.alertCollectorNameForgiven();
            }
        });

    }

    get errorControl() {
        return this.fgCollector.controls;
    }

    onToggleFormally($event: any) {
        this.bFormally = $event['detail']['checked'];
    }

    compareAddress() {
        return (this.fgCollector.get('cName').value === this.fgCollector.get('cShippingNameOne').value &&
            this.fgCollector.get('cNameDetails').value === this.fgCollector.get('cShippingNameTwo').value &&
            'z.H. ' + this.fgCollector.get('cPrenamePerson').value + ' ' + this.fgCollector.get('cSurnamePerson').value === this.fgCollector.get('cShippingNameThree').value &&
            this.fgCollector.get('cStreet').value === this.fgCollector.get('cShippingStreet').value &&
            this.fgCollector.get('cStreetNumber').value === this.fgCollector.get('cShippingStreetNumber').value &&
            this.fgCollector.get('cZip').value === this.fgCollector.get('cShippingZip').value &&
            this.fgCollector.get('cCity').value === this.fgCollector.get('cShippingCity').value &&
            this.cCountry === this.cShippingCountry);
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
            this.fgCollector.controls['cShippingCountry'].setValue(this.fgCollector.get('cCountry').value);
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
            position: 'middle'
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
}
