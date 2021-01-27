import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  // Urls
  urlInformationForCollector = "collector/download/document/informations_for_collector"

  constructor(public connApi: ConnApiService) { }

  ngOnInit() {
  }

    onInformationForCollector() {
      this.connApi.safeGetPDF(this.urlInformationForCollector).subscribe(response => {
        console.log(response);
        let blob: any = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url)
      })
    }
}
