import {Component, Injectable} from '@angular/core';
import {ConnApiService} from '../services/conn-api/conn-api.service';

@Injectable()

export class Downloads {

    // Urls
    urlInformationForCollector = 'download/document/informations_for_collector';
    urlBecomeCollector = 'download/document/become_collector';

    constructor(public Api: ConnApiService) {}

    public informationForCollector() {
        this.Api.getFile(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url)
        })
    }

    public becomeCollector() {
        this.Api.getFile(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
}



