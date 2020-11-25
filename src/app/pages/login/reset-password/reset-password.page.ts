import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {DataService} from "../../../services/data/data.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {AlertController} from "@ionic/angular";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    resetForm = this.fb.group({
        inputEmail: ['']
    })

    constructor(private fb: FormBuilder, private connApi: ConnApiService, private data: DataService, public router: Router, public alertController: AlertController) {
    }

    role: number;

    ngOnInit() {
        this.data.currentRole.subscribe(role => console.log(this.role = role))
    }

    private onResetPassword() {
        let json = {
            'role': this.role,
            'email':this.resetForm.get('inputEmail').value
        }
        console.log(json);
        this.connApi.post(ConnApiService.postMailResetPassword, json).subscribe((data: HttpResponse<any>) => {
            console.log("jooo");
            if (data.status == 200) {
                console.log("Reset-Password Mail sent")
                this.alertCheckEmail();
            }
        }, error => {
            if (error.status == 400) {
                console.log("Email Adress unknown");
            }
        });
    }

    async alertCheckEmail() {
        const alert = await this.alertController.create({
            header: 'E-Mail versendet',
            message: 'Wir haben Dir soeben eine E-Mail zum Zurücksetzen Deines Passworts gesendet.',
            buttons: [{text: 'Zurück zum Login', handler: () => {this.router.navigate(['login'])}}]
        });

        await alert.present();
    }
}
