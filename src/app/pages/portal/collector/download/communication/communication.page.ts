import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpResponse} from '@angular/common/http';
import {Toast} from '../../../../../utilities/toast';
import {Alert} from "../../../../../utilities/alert";

@Component({
  selector: 'app-communication',
  templateUrl: './communication.page.html',
  styleUrls: ['./communication.page.scss'],
  providers: [Toast, Alert]
})
export class CommunicationPage implements OnInit {

  // Urls
  urlModelPressRelease = "collector/download/document/model_press_release"
  urlFlyer = "collector/download/media/flyer"
  urlPoster = "collector/download/media/poster"

  // Variables
  lFlyer = [];
  lPoster = [];

  constructor(public Alert: Alert, public connApi: ConnApiService, public Toast: Toast) { }

  ngOnInit() {
    this.connApi.safeGet(this.urlFlyer).subscribe((response : HttpResponse<any>) => {
      console.log(response);
      this.lFlyer = response.body;
    }, error => {
      console.log(error);
    });

    this.connApi.safeGet(this.urlPoster).subscribe((response : HttpResponse<any>) => {
      console.log(response);
      this.lPoster = response.body;
    }, error => {
      console.log(error);
    });
  }

    onModelPressRelease() {
      this.connApi.safeGetFile(this.urlModelPressRelease).subscribe(response => {
        console.log(response);

        var blob = new Blob([response], { type: 'application/docx' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = "Muster-Pressemitteilung.docx";
        link.click();
        this.Alert.popUp('Muster-Pressemitteilung').then(res => {
          if (!res) link.click();
        })
      })
    }

  onFlyer(id: any) {
    this.connApi.safeGetFile(this.urlFlyer+'/'+id).subscribe(response => {
      console.log(response);
      let blob: any = new Blob([response], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url)
      this.Alert.popUp('Flyer').then(res => {
        if (!res) window.open(url);
      })
    }, error => {
      if (error.status == 404) {
        this.Toast.fileNotFound();
      }
    })
  }

  onPoster(id: any) {
    this.connApi.safeGetFile(this.urlPoster+'/'+id).subscribe(response => {
      console.log(response);
      let blob: any = new Blob([response], {type: 'application/pdf'});
      const url = window.URL.createObjectURL(blob);
      window.open(url)
      this.Alert.popUp('Poster').then(res => {
        if (!res) window.open(url);
      })
    }, error => {
      if (error.status == 404) {
        this.Toast.fileNotFound();
      }
    })
  }
}
