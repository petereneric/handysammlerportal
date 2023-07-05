import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';
import {repeat} from 'rxjs/operators';
import {Alert} from '../../../../../utilities/alert';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
    providers: [Alert]
})
export class AddPage implements OnInit {

    // Urls
    private urlLithiumIonLabel = 'collector/lithium-ion-label';
    private urlLabel = 'collector/label';

    constructor(public Alert: Alert, public connApi: ConnApiService, private router: Router, private alertController: AlertController) {
    }

    ngOnInit() {
        //localStorage.setItem('bPopUp', 'false');
    }


    onClickLithiumNotice() {
        this.connApi.safeGetFile(this.urlLithiumIonLabel).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Lithium-Ionen-Warnhinweis').then(res => {
                if (!res) window.open(url);
            })
        });
    }

    onClickShippingLabel() {
        this.dialogCreateLabel();
    }

    // Dialogs
    async dialogMaxLabels() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Maximale Versandmenge',
            message: 'Du hast Deine maximal täglich verfügbare Versandmenge erreicht und kannst heute leider kein weiteres ' +
                'Versand-Label erstellen. Weitere Versendungen sind morgen wieder möglich',
            buttons: ['Ok']
        });

        await alert.present();
    }

    async dialogCreateLabel() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Versand bestätigen',
            message: 'Bitte bestätige uns kurz, dass du Dein Paket fertig gepackt, die Versandvorschriften beachtet und den Lithium-Ionen-Warnhinweis ' +
                'aufgeklebt hast. Danach erstellen wir Dir ein neues Versand-Label und merken ' +
                'Deine Versendung vor.',
            buttons: [{
                'text': 'Bestätigen', handler: () => {
                    this.connApi.safeGetFile(this.urlLabel).subscribe(response => {
                            console.log(response);
                            let blob: any = new Blob([response], {type: 'application/pdf'});
                            const url = window.URL.createObjectURL(blob);
                            window.open(url);
                            this.Alert.popUp('DHL Versandlabel').then(res => {
                                if (!res) window.open(url);
                            })
                        },
                        error => {
                            console.log(error);
                            if (error.status == 429) {
                                this.dialogMaxLabels();
                            }
                        });
                }
            }, 'Ich bin noch nicht soweit']
        });

        await alert.present();
    }
}
