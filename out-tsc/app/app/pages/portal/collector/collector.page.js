import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CollectorPage = class CollectorPage {
    constructor(api, menuCtrl, platform, splashScreen, statusBar) {
        this.api = api;
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        // Url
        this.urlCollector = 'collector/main';
        // Variables
        this.oCollector = null;
        this.currentPageTitle = '/data';
        this.appPages = [
            {
                title: 'Meine Daten',
                url: 'data',
                icon: 'person'
            },
            {
                title: 'Bestellen',
                url: 'order',
                icon: 'create'
            },
            {
                title: 'Versenden',
                url: 'send',
                icon: 'send'
            },
            {
                title: 'Statistiken',
                url: 'statistics',
                icon: 'stats-chart'
            },
            {
                title: 'Download-Bereich',
                url: 'download',
                icon: 'download'
            },
            {
                title: 'Über uns',
                url: 'about',
                icon: 'leaf'
            },
        ];
        this.selectedIndex = 0;
        console.log('jooooo');
        this.initializeApp();
    }
    ngOnInit() {
        console.log('jo');
        this.menuCtrl.toggle();
        // data
        this.api.safeGet(this.urlCollector).subscribe((response) => {
            this.oCollector = response.body;
        }, error => {
            console.log(error);
        });
    }
    openMenu() {
        this.menuCtrl.open();
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
};
CollectorPage = __decorate([
    Component({
        selector: 'app-collector',
        templateUrl: './collector.page.html',
        styleUrls: ['./collector.page.scss'],
    })
], CollectorPage);
export { CollectorPage };
//# sourceMappingURL=collector.page.js.map