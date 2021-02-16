import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SettingsPage = class SettingsPage {
    constructor(connApi) {
        this.connApi = connApi;
        // Urls
        this.urlSettings = 'collector/settings';
        // Variables
        this.bStatistics = null;
    }
    ngOnInit() {
        this.connApi.safeGet(this.urlSettings).subscribe((response) => {
            let data = response.body;
            this.bStatistics = data.bStatistics == 1;
        });
    }
    onChange() {
        console.log("jo");
        this.save();
    }
    save() {
        // prepare
        let data = {
            bStatistics: this.bStatistics ? 1 : 0
        };
        // send
        this.connApi.safePost(this.urlSettings, data).subscribe((response) => {
            console.log(response);
        }, error => {
            console.log(error);
        });
    }
};
SettingsPage = __decorate([
    Component({
        selector: 'app-settings',
        templateUrl: './settings.page.html',
        styleUrls: ['./settings.page.scss'],
    })
], SettingsPage);
export { SettingsPage };
//# sourceMappingURL=settings.page.js.map