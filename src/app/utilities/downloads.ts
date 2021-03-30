import {Component, Injectable} from '@angular/core';
import {ConnApiService} from '../services/conn-api/conn-api.service';
import {Alert} from './alert';

@Injectable()

export class Downloads {

    // Urls
    urlInformationForCollector = 'download/document/informations_for_collector';
    urlBecomeCollector = 'download/document/become_collector';
    private urlTermsOfUse = 'agreement/terms_of_use/';
    private urlPrivacyPolicy = 'agreement/privacy_policy/';

    constructor(public Alert: Alert, public Api: ConnApiService) {}

    public informationForCollector() {
        this.Api.getFile(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
            this.Alert.popUp('Informationen für Sammler').then(res => {
                if (!res) window.open(url);
            })
        })
    }

    public becomeCollector() {
        this.Api.getFile(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Sammler werden').then(res => {
                if (!res) window.open(url);
            })
        });
    }

    public privacyPolicyCollector() {
        this.Api.getFile(this.urlPrivacyPolicy+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
            this.Alert.popUp('Datenschutzerklärung').then(res => {
                if (!res) window.open(url)
            })
        })
    }

    public termsOfUseCollector() {
        this.Api.getFile(this.urlTermsOfUse+1).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
            this.Alert.popUp('Nutzungsbedingungen').then(res => {
                if (!res) window.open(url)
            })
        }, error => {
            console.log(error)
        })
    }
}



