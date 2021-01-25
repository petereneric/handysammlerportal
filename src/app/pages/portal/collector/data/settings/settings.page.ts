import {Component, NgModule, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    // Urls
    urlSettings = 'collector/settings'

    // Variables
    bStatistics: boolean = null

    constructor(private connApi: ConnApiService) {
    }

    ngOnInit() {
        this.connApi.safeGet(this.urlSettings).subscribe((response: HttpResponse<any>) => {
            let data = response.body
            this.bStatistics = data.bStatistics == 1
        })
    }

    onChange() {
        console.log("jo")
        this.save();
    }

    save() {
        // prepare
        let data = {
            bStatistics: this.bStatistics ? 1 : 0
        }

        // send
        this.connApi.safePost(this.urlSettings, data).subscribe((response: HttpResponse<any>) => {
            console.log(response)
        }, error => {
            console.log(error)
        })
    }
}
