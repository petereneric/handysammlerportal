import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConnApiService} from "../../../services/conn-api.service";

@Component({
    selector: 'app-verification',
    templateUrl: './verification.page.html',
    styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

    constructor(public router: Router, private connApi: ConnApiService) {
    }

    ngOnInit() {
        this.checkVerification()
    }

    mailVerification() {
        let promise = this.connApi.safePost(ConnApiService.postMailRegistration, null);
        promise.then((response)=>{
            if (response.status == 200) {
                console.log("Verification mail sent");
            }
        }).catch((error)=>{
            console.log(error.message);
        });
    }

    checkVerification() {
        this.router.navigate(['app-root']);
    }

}
