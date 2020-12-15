import {Component, OnInit} from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpClient} from "@angular/common/http";
import {Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    // Urls
    private urlLithiumIonLabel = 'collector/lithium-ion-label';
    private urlLabel = 'collector/label';

    constructor(public connApi: ConnApiService, private router: Router, private alertController: AlertController) {
    }

    ngOnInit() {
    }


    onClickLithiumNotice() {
        this.connApi.safeDownload(this.urlLithiumIonLabel).subscribe(response => {
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    onClickShippingLabel() {
        this.dialogCreateLabel();
    }

    // Dialogs
    async dialogMaxLabels() {
        const alert = await this.alertController.create({
            header: 'Maximale Versandmenge',
            message: 'Du hast Deine maximal täglich verfügbare Versandmenge erreicht und kannst heute leider kein weiteres ' +
                'Versand-Label erstellen. Weitere Versendungen sind morgen wieder möglich',
            buttons: ['Ok']
        });

        await alert.present();
    }

    async dialogCreateLabel() {
        const alert = await this.alertController.create({
            header: 'Versand bestätigen',
            message: 'Bitte bestätige uns kurz, dass du Dein Paket fertig gepackt und den Lithium-Ionen-Warnhinweis ' +
                'aufgeklebt hast. Danach erstellen wir Dir ein neues Versand-Label und merken ' +
                'Deine Versendung vor.',
            buttons: [{'text':'Bestätigen', handler: () => {
                    this.connApi.safeGet(this.urlLabel).subscribe(response => {
                            console.log(response);
                            console.log(response.status);
                        },
                        error => {
                            if (error.status == 429) {
                                this.dialogMaxLabels();
                            }
                        })
                }
        }]
        });

        await alert.present();
    }
}