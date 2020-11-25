import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";

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
        this.connApi.safePost(ConnApiService.postMailRegistration, null).subscribe((data:HttpResponse<any>) => {
            if (data.status == 200) {
                console.log("Verification mail sent");
            }
        }, error => {
            console.log(error.message);
        });
    }

    checkVerification() {
        this.router.navigate(['app-root']);
    }

}
