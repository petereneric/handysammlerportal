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
}
