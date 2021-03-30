import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Toast } from '../../../../../utilities/toast';
import { Alert } from "../../../../../utilities/alert";
let CommunicationPage = class CommunicationPage {
    constructor(Alert, connApi, Toast) {
        this.Alert = Alert;
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
        this.connApi.safeGetFile(this.urlModelPressRelease).subscribe(response => {
            console.log(response);
            var blob = new Blob([response], { type: 'application/docx' });
            var link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = "Muster-Pressemitteilung.docx";
            link.click();
            this.Alert.popUp('Muster-Pressemitteilung').then(res => {
                if (!res)
                    link.click();
            });
        });
    }
    onFlyer(id) {
        this.connApi.safeGetFile(this.urlFlyer + '/' + id).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Flyer').then(res => {
                if (!res)
                    window.open(url);
            });
        }, error => {
            if (error.status == 404) {
                this.Toast.fileNotFound();
            }
        });
    }
    onPoster(id) {
        this.connApi.safeGetFile(this.urlPoster + '/' + id).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Poster').then(res => {
                if (!res)
                    window.open(url);
            });
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
        providers: [Toast, Alert]
    })
], CommunicationPage);
export { CommunicationPage };
//# sourceMappingURL=communication.page.js.map