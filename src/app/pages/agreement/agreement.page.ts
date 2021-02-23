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
    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    // Variables
    bTermsOfUse: boolean = null;
    bPrivacyPolicy: boolean = null;
    bSubmitted = false;
    bAny = false;
    data = null;
    length: number = 0;
    ip;
    tStakeholder;

    constructor(private http:HttpClient, private router: Router, public api: ConnApiService) {
    }

    ngOnInit() {
        // stakeholder
        let token:string = localStorage.getItem('token');
        if (token == null) {
            this.router.navigate(['app-root']);
        } else {
            let tokenInfo = jwt_decode(token);
            this.tStakeholder = tokenInfo['role'];

        }

        // ip
        this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
            this.ip =  res.ip;
        });

        // agreements
        this.api.safeGet(this.urlAgreement).subscribe((response: HttpResponse<any>) => {
            this.data = response.body;
            this.length = this.data.length;

            // check for any agreement
            if (this.length > 0) {
                // check for concrete agreements
                for (let i of this.data) {
                    if (i.tAgreement == 1 && this.bTermsOfUse == null) {
                        this.bTermsOfUse = false;
                    }
                    if (i.tAgreement == 2 && this.bPrivacyPolicy == null) {
                        this.bPrivacyPolicy = false;
                    }
                }
                // check if this is the first agreement with stakeholder or an update of existing ones
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
        this.api.getPDF(this.urlTermsOfUse+this.tStakeholder).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        }, error => {
            console.log(error)
        })
    }

    onPrivacyPolicy() {
        this.api.getPDF(this.urlPrivacyPolicy+this.tStakeholder).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    isDisabled() {
        let bTermsOfUse;
        if (this.bTermsOfUse == null) {
            bTermsOfUse = true;
        } else {
            bTermsOfUse = this.bTermsOfUse;
        }
        let bPrivacyPolicy;
        if (this.bPrivacyPolicy == null) {
            bPrivacyPolicy = true;
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
            this.router.navigate(['app-root']);
        }, error => {
            console.log("no");
            console.log(error);
        });
    }
}
