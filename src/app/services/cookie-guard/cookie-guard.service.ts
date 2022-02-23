import { Injectable } from '@angular/core';
import {AuthApiService} from '../auth-api/auth-api.service';
import {CanActivate, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {ConnApiService} from '../conn-api/conn-api.service';

@Injectable({
  providedIn: 'root'
})
export class CookieGuardService implements CanActivate {

  // Urls
  private urlPrivacyPolicy = 'agreement/privacy_policy/';

  constructor(public alert: AlertController, public toastController: ToastController, public api: ConnApiService, private authApiService: AuthApiService, public router: Router) {
  }

  canActivate(r): boolean {
    console.log("cookie!")
    let bCookie = localStorage.getItem('bCookie');
    if (bCookie == null || bCookie === 'false') {
      this.dialogCookie()
      return true;
    } else {
      return true;
    }
  }

  async dialogCookie() {
    const alert = await this.alert.create({
      header: 'Cookies',
      message: 'Wir, bei uns im Handysammler-Portal, nutzen keine Cookies zur Speicherung oder Verarbeitung deiner Daten. Du musst deren Nutzung also nicht zustimmen.',
      cssClass: 'my-alert',
      buttons: [{text: 'Ok',
        handler: () => {
          localStorage.setItem('bCookie', 'true');
        }},
        {
        text: 'Weitere Informationen',
        handler: () => {
          this.onPrivacyPolicy()
        }
      }]
    });

    await alert.present();
  }

  onPrivacyPolicy() {
    this.api.getFile(this.urlPrivacyPolicy+1).subscribe(response => {
      console.log(response);
      let blob: any = new Blob([response], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url)
    })
  }
}
