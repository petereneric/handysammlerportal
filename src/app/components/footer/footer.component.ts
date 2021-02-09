import {Component, OnInit} from '@angular/core';
import * as https from 'https';
import {Router} from "@angular/router";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    onImpressum() {
        this.router.navigate(['impressum']);
    }

    onMobileBox() {
        window.open('https://mobile-box.eu', "_blank");
    }

    onSecurity() {

    }

    onTermsOfUse() {

    }
}
