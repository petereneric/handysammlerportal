import {Component, OnInit} from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {Downloads} from "../../../../../utilities/downloads";
import {Alert} from "../../../../../utilities/alert";

@Component({
    selector: 'app-law',
    templateUrl: './law.page.html',
    styleUrls: ['./law.page.scss'],
    providers: [Downloads, Alert]
})
export class LawPage implements OnInit {

    // Urls
    urlLegalStatement = "collector/download/document/legal_statement"
    urlDataPrivacy = "collector/download/document/data_privacy"
    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    constructor(public Alert: Alert, public Downloads: Downloads, public connApi: ConnApiService) {
    }

    ngOnInit() {
    }

    onLegalStatement() {
        this.connApi.safeGetFile(this.urlLegalStatement).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
            this.Alert.popUp('Rechtliche Grundlage').then(res => {
                if (!res) window.open(url);
            })
        })
    }

    onDataPrivacy() {
        this.connApi.safeGetFile(this.urlDataPrivacy).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
            this.Alert.popUp('Datenschutz').then(res => {
                if (!res) window.open(url);
            })
        })
    }

    onPrivacyPolicy() {
        this.Downloads.privacyPolicyCollector();
    }

    onTermsOfUse() {
        this.Downloads.termsOfUseCollector();
    }
}
