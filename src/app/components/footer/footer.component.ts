import {Component, OnInit} from '@angular/core';
import * as https from 'https';
import {Router} from "@angular/router";
import {ConnApiService} from '../../services/conn-api/conn-api.service';
import {Downloads} from '../../utilities/downloads';
import {Alert} from "../../utilities/alert";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    providers: [Downloads, Alert]
})
export class FooterComponent implements OnInit {

    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    constructor(public Downloads: Downloads, public api: ConnApiService, public router: Router) {
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
        this.Downloads.privacyPolicyCollector();
    }

    onTermsOfUse() {
        this.Downloads.termsOfUseCollector();
    }
}
