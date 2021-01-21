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
  private lPartners: any[] = [];
  private cPartner = null;
  private bChangePartner: boolean = true;

  constructor(private connApi: ConnApiService, private toastController: ToastController) {
  }

  ngOnInit() {
    // Partner
    this.connApi.safeGet(this.urlPartner).subscribe((response: HttpResponse<any>) => {
      let partner = response.body;
      if (partner != null) {
        this.lPartners.forEach((element) => {
          if (partner.cName === element.cName) {
            this.cPartner = partner.cName;
            console.log(partner.bChangePartner);
            this.bChangePartner = partner.bChangePartner == 1 ? true : false;
          }
        });
      }
    })

    // Partners
    this.connApi.safeGet(this.urlPartners).subscribe((response: HttpResponse<any>) => {
      this.lPartners = response.body;
      console.log(this.lPartners);
    })
  }

  savePartner() {
    // prepare data
    let kPartner: number = 0;
    this.lPartners.forEach((element) => {
      if (element.cName === this.cPartner) {
        kPartner = element.kPartner;
      }
    });

    console.log("partner: "+kPartner);
    let data = {
      kPartner : kPartner
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
      position: 'middle'
    });
    await toast.present();
  }

  onSelectedPartner($event: any) {
    this.cPartner = $event['detail']['value'];
    this.savePartner();
  }
}
