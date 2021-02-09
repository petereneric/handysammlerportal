import {Component, OnInit} from '@angular/core';
import * as https from 'https';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

    onImpressum() {

    }

    onMobileBox() {
        window.open('https://mobile-box.eu', "_blank");
    }

    onSecurity() {

    }

    onTermsOfUse() {

    }
}
