import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {Location} from '../../../../../interfaces/location';
import {EventpingLocation} from '../../../../../interfaces/eventpingLocation';
import {AlertController, IonContent, ToastController} from '@ionic/angular';
import {Content} from '@angular/compiler/src/render3/r3_ast';
import {Router} from '@angular/router';
import {DataService} from '../../../../../services/data/data.service';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.page.html',
    styleUrls: ['./locations.page.scss'],
})



export class LocationsPage implements OnInit {
    @ViewChild(IonContent) content: IonContent;

    //Constants
    public maxZip = environment.maxZip;
    public maxInput = environment.maxInput;

    // Urls
    private urlLocation = 'collector/location';
    private urlLocationActive = 'collector/location/active';
    private urlLocations = 'collector/locations';

    // FormBuilder
    fgLocation = this.formBuilder.group({
        cName: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cWebsite: ['', [Validators.maxLength(this.maxInput)]],
        cStreet: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cStreetNumber: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
        cZip: ['', [Validators.required, Validators.minLength(this.maxZip), Validators.maxLength(this.maxZip)]],
        cCity: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    });

    // Variables
    bEdit: boolean = false;
    bAdd: boolean = false;
    bSubmitted: boolean = false;
    lLocationsActive: Location[] = [];
    lLocationsNotActive: Location[] = [];
    oLocationEdit: Location = null;
    bAccessEdit: boolean = false;


    constructor(private router: Router, private connApi: ConnApiService, private formBuilder: FormBuilder, public toastController: ToastController, public alertController: AlertController, private dataService: DataService) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.lLocationsActive = [];
        this.lLocationsNotActive = [];
        // Get Locations
        this.connApi.safeGet(this.urlLocations).subscribe((response: HttpResponse<any>) => {
                console.log(response.body);
                let lLocations = response.body;
                lLocations.forEach((location: Location) => {
                    if (location.bActive == 1) {
                        this.lLocationsActive.push(location);
                    } else {
                        this.lLocationsNotActive.push(location);
                    }
                });
                if (lLocations.length == 0) this.bAdd = true;
            }
        );
    }

    onSaveAdd() {
        this.bSubmitted = true;

        // check for invalid input
        if (!this.fgLocation.valid) {
            this.alertInvalid();
            return;
        }

        // prepare
        let location =
            {
                cName: this.fgLocation.get('cName').value,
                cWebsite: this.fgLocation.get('cWebsite').value,
                cStreet: this.fgLocation.get('cStreet').value,
                cStreetNumber: this.fgLocation.get('cStreetNumber').value,
                cZip: this.fgLocation.get('cZip').value,
                cCity: this.fgLocation.get('cCity').value,
                bAccess: this.bAccessEdit ? 1 : 0,
            };

        // send
        this.connApi.safePut(this.urlLocation, location).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                this.dataService.callLocation(null);
                this.bAdd = false;
                this.bSubmitted = false;
                const location: Location = data.body;
                this.lLocationsNotActive.push(location);
                this.alertAdded(location);
                this.fgLocation.reset();
                this.bAccessEdit = false

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
            this.oLocationEdit.cCity = this.fgLocation.get('cCity').value;
            this.oLocationEdit.bAccess = this.bAccessEdit ? 1 : 0

            // send
            this.connApi.safePost(this.urlLocation, this.oLocationEdit).subscribe((data: HttpResponse<any>) => {
                if (data.status == 200) {
                    this.dataService.callLocation(null);
                    this.bEdit = false;
                    this.bSubmitted = false;
                    this.fgLocation.reset();
                    this.oLocationEdit = null;
                    this.bAccessEdit = false
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

    ping($event: EventpingLocation) {
        const location: Location = $event.object;
        if ('check' === $event.label) {
            this.upload(location);
            if (location.bActive) {
                this.lLocationsActive.push(location);
                this.lLocationsNotActive.splice(this.lLocationsNotActive.indexOf(location), 1);
            } else {
                this.lLocationsNotActive.push(location);
                this.lLocationsActive.splice(this.lLocationsActive.indexOf(location), 1);
            }
        }
        if ('edit' == $event.label) {
            this.onEdit(location)
        }
        if ('delete' == $event.label) {
            this.onDelete(location)
        }
    }

    upload(location: Location) {
        console.log(location);
        this.connApi.safePost(this.urlLocation, location).subscribe((response: HttpResponse<any>) => {

            console.log(response);
        }, error => {
            console.log(error);
        });
    }

    onEdit(location: Location) {
        this.oLocationEdit = location;
        this.bAccessEdit = location.bAccess == 1
        this.isEditing(true);

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

    onDelete(location: Location) {
        this.alertDelete(location);
    }

    isAdding(bAdd: boolean) {
        this.bAdd = bAdd;
        if (!bAdd) {
            this.fgLocation.reset();
        } else {
            this.bEdit = false;
        }
    }

    isEditing(bEdit: boolean) {
        this.bEdit = bEdit;
        if (!bEdit) {
            this.fgLocation.reset();
            this.oLocationEdit = null;
        } else {
            this.bAdd = false;
        }
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

    async alertLocationForgiven() {
        const alert = await this.alertController.create({
            header: 'Hinzufügen nicht möglich',
            subHeader: 'Sammelstandort existiert bereits',
            message: 'Bitte prüfe ob an diesem Sammelstandort bereits eine Mobile-Box steht, falls nicht melde dich bitte per Mail bei uns, damit wir diesen Standort freigeben können.',
            cssClass: 'my-alert',
            buttons: ['Ok']
        });

        await alert.present();
    }

    async alertDelete(locaction: Location) {
        const alert = await this.alertController.create({
            header: 'Wirklich löschen?',
            subHeader: locaction.cName,
            cssClass: 'my-alert',
            buttons: [
                {
                    text: 'Bestätigen',
                    handler: () => {
                        console.log(locaction.id);
                        this.connApi.safeDelete(this.urlLocation+"/"+locaction.id).subscribe((response : HttpResponse<any>) => {
                            this.dataService.callLocation(null);
                            console.log(response);
                            if (locaction.bActive == 1) {
                                this.lLocationsActive.splice(this.lLocationsActive.indexOf(locaction), 1);
                            } else {
                                this.lLocationsNotActive.splice(this.lLocationsNotActive.indexOf(locaction), 1);
                            }
                        }, error => {
                            console.log(error);
                        });
                    }
                },
                {text: 'Abrechen',
                role: 'cancel'}]
        });
        await alert.present();
    }

    async alertAdded(locaction: Location) {
        const alert = await this.alertController.create({
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
                        }
                        this.connApi.safePost(this.urlLocationActive, data).subscribe((response: HttpResponse<any>) => {
                            this.load();
                        })
                    }
                },
                {text: 'Später'},
                {text: 'Bestellen', handler: () => {
                    this.router.navigate(['collector/menu/order/tabs/add'])
                }}]
        });
        await alert.present();
    }

    onToggleAccess($event: any) {
        
    }
}
