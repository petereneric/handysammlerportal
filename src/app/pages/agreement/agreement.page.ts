import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../services/conn-api/conn-api.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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

    constructor(private http:HttpClient, private router: Router, public api: ConnApiService) {
    }

    ngOnInit() {
        console.log("test");
        this.api.safeGet(this.urlAgreement).subscribe((response: HttpResponse<any>) => {
            console.log(response);
            this.data = response.body;
            this.length = Object.keys(this.data).length;
            if (this.length > 0) {
                console.log("jo");
                this.bTermsOfUse = (this.data.termsOfUse != null) ? false : null;
                console.log(this.bTermsOfUse)
                this.bPrivacyPolicy = (this.data.privacyPolicy != null) ? false : null;
                this.bAny = (this.data.termsOfUse.bAny || this.data.privacyPolicy.bAny);

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
        // prepare
        let data = {

        }

    }

    getIp()
    {
        this.http.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
            return res.ip;
        });
    }

}
