import {Component, OnInit} from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
    selector: 'app-law',
    templateUrl: './law.page.html',
    styleUrls: ['./law.page.scss'],
})
export class LawPage implements OnInit {

    // Urls
    urlLegalStatement = "collector/download/document/legal_statement"
    urlDataPrivacy = "collector/download/document/data_privacy"
    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    constructor(public connApi: ConnApiService) {
    }

    ngOnInit() {
    }

    onLegalStatement() {
        this.connApi.safeGetPDF(this.urlLegalStatement).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    onDataPrivacy() {
        this.connApi.safeGetPDF(this.urlDataPrivacy).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    onPrivacyPolicy() {
        this.connApi.getPDF(this.urlPrivacyPolicy+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    onTermsOfUse() {
        this.connApi.getPDF(this.urlTermsOfUse+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        }, error => {
            console.log(error)
        })
    }
}
