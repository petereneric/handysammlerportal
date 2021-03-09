import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpResponse} from '@angular/common/http';
import {ConnApiService} from '../../../services/conn-api/conn-api.service';
import jwt_decode from 'jwt-decode';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.page.html',
    styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

    private urlRegistrationVerify = 'registration/verify/';
    private urlInformationForCollector = 'download/document/informations_for_collector';

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private connApi: ConnApiService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            if (params.token != null) {
                this.verifyToken(params.token);
            }
        });
    }

    verifyToken(token) {
        this.connApi.get(this.urlRegistrationVerify + token).subscribe((response: HttpResponse<any>) => {
            console.log(response);
            localStorage.removeItem('token');

        }, error => {
            console.log(error);
            this.router.navigate(['invalid']);
        });
    }


    onInformation() {
        this.connApi.getPDF(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }

    onLogin() {
        this.router.navigate(['login']);
    }
}
