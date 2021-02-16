import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Toast } from '../../../../../utilities/Toast';
let CommunicationPage = class CommunicationPage {
    constructor(connApi, Toast) {
        this.connApi = connApi;
        this.Toast = Toast;
        // Urls
        this.urlModelPressRelease = "collector/download/document/model_press_release";
        this.urlFlyer = "collector/download/media/flyer";
        this.urlPoster = "collector/download/media/poster";
        // Variables
        this.lFlyer = [];
        this.lPoster = [];
    }
    ngOnInit() {
        this.connApi.safeGet(this.urlFlyer).subscribe((response) => {
            console.log(response);
            this.lFlyer = response.body;
        }, error => {
            console.log(error);
        });
        this.connApi.safeGet(this.urlPoster).subscribe((response) => {
            console.log(response);
            this.lPoster = response.body;
        }, error => {
            console.log(error);
        });
    }
    onModelPressRelease() {
        this.connApi.safeGetPDF(this.urlModelPressRelease).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    onFlyer(id) {
        this.connApi.safeGetPDF(this.urlFlyer + '/' + id).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {
            if (error.status == 404) {
                this.Toast.fileNotFound();
            }
        });
    }
};
CommunicationPage = __decorate([
    Component({
        selector: 'app-communication',
        templateUrl: './communication.page.html',
        styleUrls: ['./communication.page.scss'],
        providers: [Toast]
    })
], CommunicationPage);
export { CommunicationPage };
//# sourceMappingURL=communication.page.js.map