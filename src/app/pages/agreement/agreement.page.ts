import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../services/conn-api/conn-api.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
    selector: 'app-agreement',
    templateUrl: './agreement.page.html',
    styleUrls: ['./agreement.page.scss'],
})
export class AgreementPage implements OnInit {

    // Urls
    private urlAgreement = 'agreement';

    // Variables
    bTermsOfUse: boolean = null;
    bPrivacyPolicy: boolean = null;
    bSubmitted = false;
    bAny = false;
    data = null;
    length: number = 0;
    ip;

    constructor(private http:HttpClient, private router: Router, public api: ConnApiService) {
    }

    ngOnInit() {
        console.log(localStorage.getItem('token'));
        this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
            console.log(res.ip);
            this.ip =  res.ip;
        });

        this.api.safeGet(this.urlAgreement).subscribe((response: HttpResponse<any>) => {
            console.log(response.body);
            this.data = response.body;
            //this.length = Object.keys(this.data).length;
            this.length = this.data.length;
            if (this.length > 0) {
                //this.bTermsOfUse = (this.data.termsOfUse != null) ? false : null;
                for (let i of this.data) {
                    if (i.tAgreement == 1) {
                        this.bTermsOfUse = false;
                    }
                    if (i.tAgreement == 2) {
                        this.bPrivacyPolicy = false;
                    }
                }
                console.log(this.bTermsOfUse)
                for (let i of this.data) {
                    if (i.bAny) {
                        this.bAny = true;
                    }
                }
            } else {
                this.router.navigate(['app-root']);
            }

        }, error => {
            console.log(error);
            this.router.navigate(['app-root']);
        });
    }

    changeTermsOfUse() {
        this.bTermsOfUse = !this.bTermsOfUse;
    }

    changePrivacyPolicy() {
        this.bPrivacyPolicy = !this.bPrivacyPolicy;
    }

    onConditions() {

    }

    onPrivacyPolicy() {

    }

    isDisabled() {
        let bTermsOfUse;
        if (this.bTermsOfUse == null) {
            bTermsOfUse = false;
        } else {
            bTermsOfUse = this.bTermsOfUse;
        }
        let bPrivacyPolicy;
        if (this.bPrivacyPolicy == null) {
            bPrivacyPolicy = false;
        } else {
            bPrivacyPolicy = this.bPrivacyPolicy;
        }

        if (bTermsOfUse && bPrivacyPolicy) {
            return false
        } else {
            return true
        }
    }

    onSave() {
        for (let i of this.data) {
            // prepare
            let data = {
                cIp : this.ip,
                tAgreement : i.tAgreement,
                kAgreement : i.kAgreement
            }
            this.save(data);
        }
    }


    save(data) {
        console.log(data);
        this.api.safePut(this.urlAgreement, data).subscribe((response:HttpResponse<any>) => {
            console.log("jo");
        }, error => {
            console.log("no");
            console.log(error);
        });
    }
}
