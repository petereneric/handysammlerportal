import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ConnApiService} from '../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-request',
    templateUrl: './request.page.html',
    styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {

    // Urls
    private urlPasswordRequest = "password/request"

    // Variables
    bSubmitted: boolean = false;
    role: number = null

    // FormBuilder
    formGroup = this.fb.group({
        cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.maxLength(50)]],
    });

    constructor(public router: Router, public alertController: AlertController, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private connApi: ConnApiService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe( params => {
            if (params.role != null && (params.role == 0 || params.role == 1)) {
                this.role = params.role
            } else {
                this.router.navigate(['app-root'])
            }
        });
    }

    get errorControl() {
        return this.formGroup.controls;
    }

    onMail() {
        this.bSubmitted = true;

        // check for invalid input
        if (!this.formGroup.valid) {
            return;
        }

        // prepare
        let data = {
            'role': this.role,
            'email':this.formGroup.get('cEmail').value
        }

        // send
        this.connApi.post(this.urlPasswordRequest, data).subscribe((data: HttpResponse<any>) => {
            console.log("hier")
            console.log(data.status);
            if (data.status == 200) {
                console.log("jo??)");
                this.alertCheckEmail();
            }
        }, error => {
            console.log(error);
            if (error.status == 400) {
                this.alertUnknownEmail()
            }
        });
    }

    async alertCheckEmail() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'E-Mail versendet',
            message: 'Bitte öffne die an Dich versendete E-Mail, um dein Passwort zurückzusetzen.',
            buttons: [{text: 'Ok', handler: () => {this.router.navigate(['app-root'])}}]
        });

        await alert.present();
    }

    async alertUnknownEmail() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            subHeader: 'E-Mail-Adresse unbekannt',
            message: 'In unserer Datenbank existiert kein '+ ((this.role == 0) ? 'Sammler' : 'Partner') + ' mit dieser E-Mail Adresse.',
            buttons: ['Ok', {text: 'Ich bin ein ' + ((this.role == 1) ? 'Partner' : 'Sammler'), handler: () => {this.role = (this.role == 1) ? 0 : 1}}]
        });

        await alert.present();
    }
}
