import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CollectorPage = class CollectorPage {
    constructor(menuCtrl, platform, splashScreen, statusBar) {
        this.menuCtrl = menuCtrl;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.currentPageTitle = '/data';
        this.appPages = [
            {
                title: 'Meine Daten',
                url: 'data',
                icon: 'person'
            },
            {
                title: 'Sammel-Materialien bestellen',
                url: 'order',
                icon: 'create'
            },
            {
                title: 'Handys versenden',
                url: 'send',
                icon: 'send'
            },
            {
                title: 'Statistiken',
                url: 'statistics',
                icon: 'information'
            },
            {
                title: 'Download-Bereich',
                url: 'download',
                icon: 'download'
            },
        ];
        console.log("jooooo");
        this.initializeApp();
    }
    ngOnInit() {
        console.log("jo");
        this.menuCtrl.toggle();
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