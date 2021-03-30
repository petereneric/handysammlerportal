import { Component, OnInit } from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import {ToastController} from "@ionic/angular";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  // Urls
  private urlPartners = 'collector/partners';
  private urlPartner = 'collector/partner';

  // Variables
  public lPartners: any[] = [];
  public oPartner = null;

  constructor(private connApi: ConnApiService, private toastController: ToastController) {
  }

  ngOnInit() {
    // Partner
    this.connApi.safeGet(this.urlPartner).subscribe((response: HttpResponse<any>) => {
      let partner = response.body;
      if (partner != null) {
        this.oPartner = partner;
      }
    }, error => {
      console.log(error);
    })

    // Partners
    this.connApi.safeGet(this.urlPartners).subscribe((response: HttpResponse<any>) => {
      this.lPartners = response.body;
    })
  }

  savePartner() {
    // prepare data
    let data = {
      id : this.oPartner.id
    }

    // save
    this.connApi.safePost(this.urlPartner, data).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200) {
      }
    })
  }

  onSelectedPartner($event: any) {
    if (this.oPartner == null) {
      this.oPartner = $event['detail']['value'];
    } else {
      this.oPartner = $event['detail']['value'];
      this.savePartner();
    }

  }


}
