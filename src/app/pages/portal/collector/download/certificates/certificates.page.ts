import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {Alert} from "../../../../../utilities/alert";

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.page.html',
    styleUrls: ['./certificates.page.scss'],
    providers: [Alert]
})
export class CertificatesPage implements OnInit {

    // Urls
    urlCertificate = 'collector/download/certificate';
    urlYears = 'collector/download/certificate/years';

    // Variables
    lTime = [{key: 'total', name: 'Gesamt'}, {key: 'year', name: 'Jahr'}];
    cTime = this.lTime[0];
    lSelectTime = [];
    cSelectTime = null;

    constructor(public Alert: Alert, private connApi: ConnApiService) {
    }

    ngOnInit() {
        this.connApi.safeGet(this.urlYears).subscribe((response: HttpResponse<any>) => {
            this.lSelectTime = response.body;
            if (this.lSelectTime.length > 0) {
                this.cSelectTime = this.lSelectTime[0];
            }
        });
    }

    onCertificate() {
        // prepare
        let data = {
            kTime: this.cTime.key,
            cSelectTime: this.cSelectTime
        };
        console.log(data);

        // send
        this.connApi.safePostPDF(this.urlCertificate, data).subscribe(response => {
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Urkunde').then(res => {
                if (!res) window.open(url);
            })
        }, error => {
            console.log(error);
        });
    }
}
