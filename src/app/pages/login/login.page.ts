import {Component, OnInit} from '@angular/core';
import {AuthApiService} from '../../services/auth-api/auth-api.service';
import {Router} from '@angular/router';
import {FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {ConnApiService} from '../../services/conn-api/conn-api.service';
import {DataService} from '../../services/data/data.service';
import {HttpResponse} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
import {Downloads} from '../../utilities/downloads';
import {Alert} from "../../utilities/alert";
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    providers: [Downloads, Alert]
})

export class LoginPage implements OnInit {

    //Constants
    public maxInput = environment.maxInput;

    // Urls
    private urlLogin: string = 'login';

    // Variables
    selectedRole: number;
    bSubmittedCollector = false;
    bSubmittedPartner = false;

    loginFormPartner = this.fb.group({
        cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
        cPassword: ['', [Validators.required, Validators.maxLength(this.maxInput)]]
    });

    loginFormCollector = this.fb.group({
        cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
        cPassword: ['', [Validators.required, Validators.maxLength(this.maxInput)]]
    });

    constructor(public Alert: Alert, public Downloads: Downloads, public alertController: AlertController, private authApiService: AuthApiService, private connApiService: ConnApiService, public router: Router, private fb: FormBuilder, private data: DataService) {
        console.log('teeest');
    }

    ngOnInit(): void {
        console.log('ngOnInit: LoginPage');
        //this.data.currentRole.subscribe(role => console.log(this.selectedRole = role))
        this.selectedRole = 1;
        localStorage.setItem('bPopUp', 'false');
    }

    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
        this.data.changeRole(ev['detail']['value']);
    }

    private login(role: number) {
        // check


        // check for invalid input
        if (role == 1) {
            this.bSubmittedCollector = true;
            if (!this.loginFormCollector.valid) {
                this.getFormValidationErrorsCollector();
                this.alertInvalid();
                return;
            }
        }
        if (role == 2) {
            this.bSubmittedPartner = true;
            if (!this.loginFormPartner.valid) {
                //this.getFormValidationErrors();
                this.alertInvalid();
                return;
            }
        }


        // prepare
        let data = {
            'role': role,
            'email': this.loginFormCollector.get('cEmail').value,
            'password': this.loginFormCollector.get('cPassword').value
        };
        this.connApiService.post(this.urlLogin, data).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                // Save token
                console.log(data.headers.get('authorization'));
                localStorage.setItem('token', data.headers.get('authorization'));

                // Navigate
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 401) {
                this.Alert.invalidInput('E-Mail unbekannt');
            }
            if (error.status == 403) {
                this.Alert.invalidInput('Passwort falsch');
            }
        });
    }

    getFormValidationErrorsCollector() {
        Object.keys(this.loginFormCollector.controls).forEach(key => {

            const controlErrors: ValidationErrors = this.loginFormCollector.get(key).errors;
            if (controlErrors != null) {
                Object.keys(controlErrors).forEach(keyError => {
                    console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
                });
            }
        });
    }

    get errorControlCollector() {
        return this.loginFormCollector.controls;
    }

    get errorControlPartner() {
        return this.loginFormPartner.controls;
    }

    onLoginCollector() {
        this.login(1);
    }

    onLoginPartner() {
        this.login(2);
    }

    navRegisterCollector() {
        this.router.navigate(['registration-collector/id/0']);
    }

    onResetPassword() {
        this.router.navigate(['request/role/' + this.selectedRole]);
    }

    // Alert
    async alertWrongLoginCredentials(subheader) {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            subHeader: subheader,
            message: 'Bitte überprüfe und korrigiere deine Eingabe.',
            buttons: ['Ok']
        });
        await alert.present();
    }

    async alertInvalid() {
        const alert = await this.alertController.create({
            cssClass: 'my-alert',
            header: 'Ungültige Eingabe',
            message: 'Bitte überprüfe deine Daten und korrigiere diese an den markierten Stellen.',
            buttons: ['Ok']
        });

        await alert.present();
    }

    onInfo() {
        this.Downloads.becomeCollector();
    }

    isCollectorInput() {

    }
}
