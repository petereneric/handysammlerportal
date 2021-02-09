import {Component, OnInit} from '@angular/core';
import {AuthApiService} from "../../services/auth-api/auth-api.service";
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ConnApiService} from "../../services/conn-api/conn-api.service";
import {DataService} from "../../services/data/data.service";
import {HttpResponse} from "@angular/common/http";

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
    selectedRole: number;

    loginFormPartner = this.fb.group({
        email: [''],
        password: ['']
    });

    loginFormCollector = this.fb.group({
        email: [''],
        password: ['']
    });

    constructor(private authApiService: AuthApiService, private connApiService: ConnApiService, public router: Router, private fb: FormBuilder, private data: DataService) {
    console.log("teeest");
    }

    ngOnInit(): void {
        console.log("ngOnInit: LoginPage");
        //this.data.currentRole.subscribe(role => console.log(this.selectedRole = role))
        this.selectedRole = 0;
    }

    segmentChanged(ev: any) {
        console.log('Segment changed', ev);
        this.data.changeRole(ev['detail']['value']);
    }

    private login(role: number) {
        let data = {
            'role': role,
            'email': this.loginFormCollector.get('email').value,
            'password': this.loginFormCollector.get('password').value
        };
        this.connApiService.post(ConnApiService.postLogin, data).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                // Save token
                console.log(data.headers.get('authorization'));
                localStorage.setItem('token', data.headers.get('authorization'));

                // Navigate
                this.router.navigate(['app-root']);
            }
        }, error => {
            if (error.status == 401) {
                console.log('wrong login credentials');
            }
        });
    }

    onLoginCollector() {
        this.login(0);
    }

    onLoginPartner() {
        this.login(1);
    }

    navRegisterCollector() {
        this.router.navigate(['registration-collector/id/0'])
    }

    onResetPassword() {
        this.router.navigate(['reset-password']);
    }
}
