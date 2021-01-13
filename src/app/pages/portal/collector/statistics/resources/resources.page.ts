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

}
