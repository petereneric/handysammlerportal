import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";

@Component({
  selector: 'app-communication',
  templateUrl: './communication.page.html',
  styleUrls: ['./communication.page.scss'],
})
export class CommunicationPage implements OnInit {

  // Urls
  urlModelPressRelease = "collector/download/document/model_press_release"

  constructor(public connApi: ConnApiService) { }

  ngOnInit() {
  }

    onModelPressRelease() {
      this.connApi.safeGetPDF(this.urlModelPressRelease).subscribe(response => {
        console.log(response);
        let blob: any = new Blob([response], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url)
      })
    }
}
