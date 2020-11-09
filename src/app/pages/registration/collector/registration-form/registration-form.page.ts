import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ConnApiService} from "../../../../services/conn-api.service";
import {forEachComment} from "tslint";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-registration-form',
    templateUrl: './registration-form.page.html',
    styleUrls: ['./registration-form.page.scss'],
})
export class RegistrationFormPage implements OnInit {

    registrationFormCollector = this.fb.group({
        collection_nameCollector: [''],
        collection_password: [''],
        collection_passwordCheck: [''],
        contact_prename: [''],
        contact_surname: [''],
        contact_formal: [''],
        contact_email: [''],
        contact_emailCheck: [''],
        contact_emailCC: [''],
        contact_phoneFixedLine: [''],
        contact_phoneMobile: [''],
        shipping_nameOne: [''],
        shipping_nameTwo: [''],
        shipping_street: [''],
        shipping_streetNumber: [''],
        shipping_city: [''],
        shipping_zip: [''],
    });

    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';

    lCountries: any[] = [
        {name: "Deutschland"}
    ]

    cCountry: string = this.lCountries[0].name;


    typesCollector: any[] = [
        {
            id: 1,
            name: 'Schule',
        },
        {
            id: 2,
            name: 'Stadt',
        },
    ];

    tCollector: number = 0;

    lPartner: any[];

    kPartner: number;


    contactTitles: any[] = [
        {
            name: 'Herr',
        },
        {
            name: 'Frau',
        },
        {
            name: 'Herr Dr.',
        },
        {
            name: 'Frau Dr.',
        },
    ];

    cContactTitle: string = null;

    compareWithFn = (o1, o2) => {
        return o1 && o2 ? o1.id === o2.id : o1 === o2;
    };

    compareWith = this.compareWithFn;
    bContactFormal: boolean = true;
    bPartnerAdmin: boolean = false;
    typeCollector: any = "typeCollector";

    constructor(private fb: FormBuilder, private connApi: ConnApiService, public alertController: AlertController) {
    }

    ngOnInit() {
        // Country


        // TypesCollector
        let promise = this.connApi.getResponse(ConnApiService.getCollectorTypes);
        promise.then((response) => {
            if (response.status == 200) {
                console.log(response.body);
                var array = response.body['collectionTypes'];
                array.forEach(element => console.log(element));
                this.typesCollector = array;
            } else {
                console.log(response.body['collectionTypes']);
            }
        });

        // listPartner
        let promisePartner = this.connApi.getResponse(ConnApiService.getPartnerRegistration);
        promisePartner.then((response) => {
            if (response.status == 200) {
                console.log(response.body);
                var array = response.body['lPartner'];
                array.forEach(element => console.log(element));
                this.lPartner = array;
            } else {
                console.log(response.body['collectionTypes']);
            }
        });
    }

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

    registerCollector() {
        // check if password identical
        if (this.registrationFormCollector.get('collection_password').value !== this.registrationFormCollector.get('collection_passwordCheck').value) {
            this.alertPasswordNotIdentical();
            return;
        }
        if (this.registrationFormCollector.get('collection_password').value.length < 8) {
            this.alertPasswordTooShort();
            return;
        }
        if (this.registrationFormCollector.get('contact_email').value !== this.registrationFormCollector.get('contact_emailCheck').value) {
            this.alertEmailNotIdentical();
            return;
        }

        let collector =
                {
                    'cCollector': this.registrationFormCollector.get('collection_nameCollector').value,
                    'cPassword': this.registrationFormCollector.get('collection_password').value,
                    tCollector: this.tCollector,
                    cSurname: this.registrationFormCollector.get('contact_surname').value,
                    cPrename: this.registrationFormCollector.get('contact_prename').value,
                    bContactFormal: this.bContactFormal ? 1 : 0,
                    cContactTitle: this.cContactTitle,
                    cEmail: this.registrationFormCollector.get('contact_email').value,
                    cEmailCC: this.registrationFormCollector.get('contact_emailCC').value,
                    cPhoneLandline: this.registrationFormCollector.get('contact_phoneFixedLine').value,
                    cPhoneMobile: this.registrationFormCollector.get('contact_phoneMobile').value,
                    cShippingAddressOne: this.registrationFormCollector.get('shipping_nameOne').value,
                    cShippingAddressTwo: this.registrationFormCollector.get('shipping_nameTwo').value,
                    cStreet: this.registrationFormCollector.get('shipping_street').value,
                    cStreetNumber: this.registrationFormCollector.get('shipping_streetNumber').value,
                    cCity: this.registrationFormCollector.get('shipping_city').value,
                    cZip: this.registrationFormCollector.get('shipping_zip').value,
                    cCountry: this.cCountry,
                    kPartner: this.kPartner,
                    bPartnerAdmin: this.bPartnerAdmin ? 1 : 0
                };
        console.log(collector);
        let promise = this.connApi.post(ConnApiService.postCollector, collector);
        promise.then((response) => {
            if (response.status == 200) {
                console.log("läuft");
            } else {
                console.log("läuft nicht")
            }
        }).catch((error) => {
            if (error.status == 406) {
                this.alertCollectorNameForgiven()
                console.log('name is already forgiven');
            }
        });
    }

    onSelected_tCollector($event) {
        this.tCollector = $event['detail']['value'];
    }

    onSelected_cContactTitle($event) {
        this.cContactTitle = $event['detail']['value'];
    }

    onSelected_cCountry($event) {
        this.cCountry = $event['detail']['value'];
    }

    onSelected_kPartner($event) {
        this.kPartner = $event['detail']['value'];
    }

    onToggle_ContactFormal($event) {
        this.kPartner = $event['detail']['checked'];
        console.log(this.bContactFormal);
    }

    onToggle_bPartnerAdmin($event) {
        this.bPartnerAdmin = $event['detail']['checked'];
    }



    hideShowPassword() {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    }
}
