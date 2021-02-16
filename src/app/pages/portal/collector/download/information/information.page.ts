import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  // Urls
  urlInformationForCollector = "download/document/informations_for_collector"
  urlBecomeCollector = "download/document/become_collector"

  constructor(public connApi: ConnApiService) { }

  ngOnInit() {
  }

    onInformationForCollector() {
      this.connApi.getPDF(this.urlInformationForCollector).subscribe(response => {
        console.log(response);
        let blob: any = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url)
      })
    }

    onBecomeCollector() {
      this.connApi.getPDF(this.urlBecomeCollector).subscribe(response => {
        console.log(response);
        let blob: any = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url)
      })
    }
}
