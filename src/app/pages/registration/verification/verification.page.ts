import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import {ToastController} from '@ionic/angular';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-verification',
    templateUrl: './verification.page.html',
    styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

    private urlRegistrationMail: string = "registration/mail"

    constructor(public toastController: ToastController, public router: Router, private connApi: ConnApiService) {
    }

    ngOnInit() {
        let token:string = localStorage.getItem('token');
        if (token != null) {
            let tokenInfo = jwt_decode(token);
            let bVerified = tokenInfo['bVerified'];
            if (bVerified == 1) this.router.navigate(['app-root']);
        } else {
            this.router.navigate(['login']);
        }
    }

    public mailVerification() {
        this.connApi.safePost(this.urlRegistrationMail, null).subscribe((data:HttpResponse<any>) => {
            if (data.status == 200) {
                this.toastSent()
            }
        }, error => {
            if (error.status == 412) {
                this.toastConfirmed()
                localStorage.removeItem('token')
                this.router.navigate(['login']);
            }
            console.log(error.message);
        });
    }

    confirmVerification() {
        localStorage.removeItem('token')
        this.router.navigate(['login']);
    }

    // Toasts
    async toastSent() {
        const toast = await this.toastController.create({
            message: 'E-Mail wurde versendet',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }

    async toastConfirmed() {
        const toast = await this.toastController.create({
            message: 'Deine E-Mail Adresse wurde bereits bestätigt',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }

}
