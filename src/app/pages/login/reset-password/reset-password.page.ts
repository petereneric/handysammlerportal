import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {ConnApiService} from "../../../services/conn-api.service";
import {DataService} from "../../../services/data.service";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

    resetForm = this.fb.group({
        inputEmail: ['']
    })

    constructor(private fb: FormBuilder, private connApi: ConnApiService, private data: DataService) {
    }

    ngOnInit() {
        this.data.currentRole.subscribe(role => console.log("Role"+role))
    }

    onResetPassword() {
        let json = {
            'role': 0,
            'email':this.resetForm.get('inputEmail').value
        }
        let promise = this.connApi.post(ConnApiService.postMailResetPassword, json);
        promise.then((response) => {
            if (response.status == 200) {
                console.log("Reset-Password Mail sent")
            }
        }).catch((error) => {
            if (error.status == 400) {
                console.log("Email Adress unknown");
            }
            console.log(error.message);
        })
    }
}
