import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';
import {FormBuilder, Validators} from '@angular/forms';
import {ConnApiService} from '../../../services/conn-api/conn-api.service';
import jwt_decode from 'jwt-decode';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  // Urls
  private urlReset = 'password/reset'

  // Variables
  bSubmitted = false;
  bShowPassword = false;
  token = null;
  role = null;

  // FormBuilder
  formGroup = this.fb.group({
    cPassword: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])^[A-Za-z0-9$@$!%*?&].{7,}'), Validators.minLength(8)]]
  });


  constructor(public toastController: ToastController, public router: Router, public alertController: AlertController, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private connApi: ConnApiService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      let exp: number
      if (params.token != null) {
        this.token = params.token;

        let tokenInfo = jwt_decode(this.token);
        this.role = tokenInfo['role'];
        exp = tokenInfo['exp'];
        if (this.role == null || exp == null) {
          this.router.navigate(['app-root']);
        }
        // Check if token has expired
        if ((Date.now()/1000) > exp) {
          this.alertInvalidToken()
        }
      } else {
        this.router.navigate(['app-root']);
      }
    });
  }

  get errorControl() {
    return this.formGroup.controls;
  }

  onShow() {
    this.bShowPassword = !this.bShowPassword;
  }

  onSave() {
    this.bSubmitted = true;

    // check for invalid input
    if (!this.formGroup.valid) {
      this.alertInvalid()
      return;
    }

    // prepare
    let data = {
      password : this.formGroup.get('cPassword').value,
      token : this.token
    }

    // send
    this.connApi.post(this.urlReset, data).subscribe((response: HttpResponse<any>) => {
      this.toastSaved()
      localStorage.removeItem('token');
      this.router.navigate(['app-root'])
    }, error => {
      console.log(error)
    })
  }

  // Password

  passwordInactive() {
    return this.formGroup.get('cPassword').value.length == 0;
  }

  passwordLength() {
    return this.formGroup.get('cPassword').value.length >= 8;
  }

  passwordBigSmall() {
    let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
    return regex.test(this.formGroup.get('cPassword').value);
  }

  passwordNumber() {
    let regex = new RegExp('(?=.*[1-9])');
    return regex.test(this.formGroup.get('cPassword').value);
  }

  passwordExtra() {
    let regex = new RegExp('(?=.*[§#@$!%*?&])');
    return regex.test(this.formGroup.get('cPassword').value);
  }

  // Toasts
  async toastSaved() {
    const toast = await this.toastController.create({
      message: 'Dein Passwort wurde erfolgreich zurückgesetzt.',
      duration: 4000,
      cssClass: 'my-toast',
      position: 'bottom'
    });
    await toast.present();
  }

  async alertInvalidToken() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      header: 'Dieser Link ist ungültig',
      message: 'Möglicherweise ist der Link abegelaufen, da er nach Zusendung nur eine Stunde lang gültig ist. In diesem Fall kannst du dir einen neuen zusenden lassen.',
      buttons: [{text: 'Ok', handler: () => {this.router.navigate(['request/role/'+((this.role == 0) ? 1 : 0)])}}]
    });

    await alert.present();
  }


  async alertInvalid() {
    const alert = await this.alertController.create({
      cssClass: 'my-alert',
      header: 'Ungültiges Passwort',
      message: 'Bitte ändere dein Passwort, sodass es alle unter dem Passwort stehenden Bedingungen erfüllt.',
      buttons: ['Ok']
    });

    await alert.present();
  }
}
