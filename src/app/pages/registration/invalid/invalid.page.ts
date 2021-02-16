import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {ConnApiService} from '../../../services/conn-api/conn-api.service';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-invalid',
  templateUrl: './invalid.page.html',
  styleUrls: ['./invalid.page.scss'],
})
export class InvalidPage implements OnInit {

  // Urls
  private urlRegistrationMail: string = "registration/mail"

  constructor(public toastController: ToastController, private connApi: ConnApiService, private router: Router) { }

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

  onMail() {
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
