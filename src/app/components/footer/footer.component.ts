import {Component, OnInit} from '@angular/core';
import * as https from 'https';
import {Router} from "@angular/router";
import {ConnApiService} from '../../services/conn-api/conn-api.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    constructor(public api: ConnApiService, public router: Router) {
    }

    ngOnInit() {
    }

    onImpressum() {
        this.router.navigate(['impressum']);
    }

    onMobileBox() {
        window.open('https://mobile-box.eu', "_blank");
    }

    onPrivacyPolicy() {
        this.api.getPDF(this.urlPrivacyPolicy+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    onTermsOfUse() {
        this.api.getPDF(this.urlTermsOfUse+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        }, error => {
            console.log(error)
        })
    }
}
