import { Injectable } from '@angular/core';
import {AuthApiService} from '../auth-api/auth-api.service';
import {CanActivate, Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {ConnApiService} from '../conn-api/conn-api.service';

@Injectable({
  providedIn: 'root'
})
export class CookieGuardService implements CanActivate {

  // Urls
  private urlPrivacyPolicy = 'agreement/privacy_policy/';

  constructor(public toastController: ToastController, public api: ConnApiService, private authApiService: AuthApiService, public router: Router) {
  }

  canActivate(r): boolean {
    console.log("cookie!")
    let bCookie = localStorage.getItem('bCookie');
    if (bCookie == null || bCookie === 'false') {
      this.toastCookie()
      return true;
    } else {
      return true;
    }
  }

  async toastCookie() {
    const toast = await this.toastController.create({
      message: 'Das Handysammlerportal nutzt Cookies. Bitte stimme der Nutzung zu um fortzufahren.',
      position: 'bottom',
      cssClass: 'my-toast',
      buttons: [
        {
          side: 'end',
          role: 'cancel',
          icon: 'checkmark',
          text: 'Akzeptieren',
          handler: () => {
            localStorage.setItem('bCookie', 'true');
          }
        }, {
          text: 'Weitere Informationen',
          role: 'cancel',
          handler: () => {
            this.toastCookie()
            this.onPrivacyPolicy()
          }
        }
      ]
    });
    toast.present();
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
