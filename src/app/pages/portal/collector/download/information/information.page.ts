import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {Downloads} from '../../../../../utilities/downloads';

@Component({
    selector: 'app-information',
    templateUrl: './information.page.html',
    styleUrls: ['./information.page.scss'],
    providers: [Downloads]
})
export class InformationPage implements OnInit {



    constructor(public connApi: ConnApiService, public Downloads: Downloads) {
    }

    ngOnInit() {
    }

    onInformationForCollector() {
        this.Downloads.informationForCollector();
    }

    onBecomeCollector() {
        this.Downloads.becomeCollector();
    }
}
