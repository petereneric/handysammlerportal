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
  public bChangePartner: boolean = true;
  public bFirstSelect = false;

  constructor(private connApi: ConnApiService, private toastController: ToastController) {
  }

  ngOnInit() {
    // Partner
    this.connApi.safeGet(this.urlPartner).subscribe((response: HttpResponse<any>) => {
      let partner = response.body;
      if (partner != null) {
        this.oPartner = partner;
        /*
        this.lPartners.forEach((element) => {
          if (partner.cName === element.cName) {
            this.oPartner = partner.cName;
            console.log(partner.bChangePartner);
            this.bChangePartner = partner.bChangePartner == 1 ? true : false;
          }
        });
         */
      }
    }, error => {
      console.log(error);
    })

    // Partners
    this.connApi.safeGet(this.urlPartners).subscribe((response: HttpResponse<any>) => {
      this.lPartners = response.body;
      console.log(this.lPartners);
    })
  }

  savePartner() {
    // prepare data
    /*
    let kPartner: number = 0;
    this.lPartners.forEach((element) => {
      if (element.cName === this.oPartner) {
        kPartner = element.kPartner;
      }
    });
     */

    let data = {
      id : this.oPartner.id
    }

    // save
    this.connApi.safePost(this.urlPartner, data).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.toastSaved();
      }
    })
  }

  // Toasts
  async toastSaved() {
    const toast = await this.toastController.create({
      message: 'Deine Daten wurden erfolgreich gespeichert.',
      duration: 2500,
      cssClass: 'my-toast',
      position: 'bottom'
    });
    await toast.present();
  }

  onSelectedPartner($event: any) {
    if (!this.bFirstSelect) {
      this.bFirstSelect = true;
    } else {
      this.oPartner = $event['detail']['value'];
      this.savePartner();
    }

  }


}
