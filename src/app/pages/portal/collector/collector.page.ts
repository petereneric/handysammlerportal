import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {ConnApiService} from '../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-collector',
    templateUrl: './collector.page.html',
    styleUrls: ['./collector.page.scss'],
})
export class CollectorPage implements OnInit {

    // Url
    private urlCollector = 'collector/main';

    // Variables
    oCollector = null;

    currentPageTitle = '/data';

    constructor(public api: ConnApiService, public menuCtrl: MenuController, private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
        console.log('jooooo');
        this.initializeApp();
    }

    appPages = [
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
            icon: 'information'
        },
        {
            title: 'Download-Bereich',
            url: 'download',
            icon: 'download'
        },

    ];
    selectedIndex = 0;

    ngOnInit() {
        console.log('jo');
        this.menuCtrl.toggle();

        // data
        this.api.safeGet(this.urlCollector).subscribe((response: HttpResponse<any>) => {
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
}
