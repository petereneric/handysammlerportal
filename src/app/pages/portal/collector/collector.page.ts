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

  currentPageTitle = '/data-collector';

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    console.log("jooooo");
    this.initializeApp();
  }

  appPages = [
    {
      title: 'Meine Daten',
      url: 'data-collector',
      icon: 'film'
    }
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
