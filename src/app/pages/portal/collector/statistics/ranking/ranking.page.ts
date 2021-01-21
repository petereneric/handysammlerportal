import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

  // Variables
  lTime = [{key: 'total', name: 'Gesamt'}, {key: 'year', name: 'Jahr'}]
  cTime = this.lTime[0]
  lRegion = [{key: 'total', name: 'Gesamt'}, {key: 'country', name: 'Land'}, {key: 'state', name: 'Bundesland'}, {key: 'city', name: 'Stadt'}]
  cRegion = this.lRegion[0]
  lType = [{key: 'total', name: 'Gesamt'}, {key: 'individual', name: 'Benutzerdefiniert'}]
  cType = this.lType[0]

  lSelectTime = [{current: 'Dieses Jahr'}, {last: 'Letztes Jahr'}];
  cSelectTime = this.lSelectTime[0]
  lSelectRegion = []
  cSelectRegion: string = null
  lSelectType = []
  cSelectType: string = null

  constructor() { }

  ngOnInit() {
    this.load()

    // load Regions
    // load Types
  }

  load() {
    // handle settings (time, region, type) and load
  }


  onLoad() {
    this.load()
  }
}
