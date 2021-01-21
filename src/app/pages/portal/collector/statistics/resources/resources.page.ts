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

  transKilogramm(nKilogramm) {
    let weight = {
      value: nKilogramm,
      unit: 'kg'
    }
    if (weight.value/1000 >= 1) {
      weight.value = nKilogramm/1000
      weight.unit = 'T'
    }

    weight.value = parseFloat(weight.value).toFixed(2)
    return weight;
  }

}
