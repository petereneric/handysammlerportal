import { Component, OnInit } from '@angular/core';
import {StatisticsPage} from "../statistics.page";
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
  selector: 'app-resources',
  templateUrl: './resources.page.html',
  styleUrls: ['./resources.page.scss'],
})
export class ResourcesPage extends StatisticsPage implements OnInit {

  // Urls
  urlStatistics = "collector/statistics/resources"

  constructor(public connApi: ConnApiService) {
    super(connApi);
  }

  ngOnInit() {
    this.load()
  }

  getGold(nGold) {

  }

  getSilver(nGold) {

  }

  getCopper(nGold) {

  }

  getCo2(nGold) {

  }

  getResources(nGold) {

  }

  transGramm(nGramm) {
    let weight = {
      value: nGramm,
      unit: 'g'
    }
    if (weight.value/1000 >= 1) {
      weight.value = nGramm/1000
      weight.unit = 'kg'
      if (weight.value/1000 >= 1) {
        weight.value = nGramm/1000
        weight.unit = 'T'
      }
    }

    weight.value = parseFloat(weight.value).toFixed(2)
    return weight;
  }

  valueGramm(nGramm): any {
    let value = nGramm
    if (value/1000 >= 1) {
      value = value/1000
      if (value/1000 >= 1) {
        value = value/1000
      }
    }
    return Math.round((value + Number.EPSILON) * 100) / 100
  }

  unitGramm(nGramm): string {
    let unit = 'g'
    if (nGramm/1000 >= 1) {
      unit = 'kg'
      if (nGramm/1000 >= 1) {
        unit = 'T'
      }
    }
    return unit
  }

  transKilogramm(nKilogramm) {

  }

}
