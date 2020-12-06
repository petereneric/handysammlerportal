import { Component, OnInit } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-collector',
  templateUrl: './collector.page.html',
  styleUrls: ['./collector.page.scss'],
})
export class CollectorPage implements OnInit {

  currentPageTitle = '/data';

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    console.log("jooooo");
    this.initializeApp();
  }

  appPages = [
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

  ]
  selectedIndex: number;

  ngOnInit() {
    console.log("jo");
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }
}
