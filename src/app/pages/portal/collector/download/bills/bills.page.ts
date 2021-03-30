import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';
import {Alert} from "../../../../../utilities/alert";

@Component({
    selector: 'app-bills',
    templateUrl: './bills.page.html',
    styleUrls: ['./bills.page.scss'],
    providers: [DatePipe, Alert],
})
export class BillsPage implements OnInit {

    // Urls
    urlYears = 'collector/download/bill/years';
    urlBills = 'collector/download/bills/';
    urlBill = 'collector/download/bill';

    // Variables
    lYears = [];
    cYear: string = null;
    lBills = [];

    constructor(public Alert: Alert, public datepipe: DatePipe, private connApi: ConnApiService, public toastController: ToastController) {
    }

    ngOnInit() {
        this.connApi.safeGet(this.urlYears).subscribe((response: HttpResponse<any>) => {
            this.lYears = response.body;
            if (this.lYears.length > 0) {
                this.cYear = this.lYears[0];
                this.load();
            }
        }, error => {
            console.log(error);
        });
    }

    load() {
        this.connApi.safeGet(this.urlBills + this.cYear).subscribe((response: HttpResponse<any>) => {
            this.lBills = response.body;
        }, error => {
            console.log(error);
        });
    }

    onYear() {
        this.load();
    }

    onBill(kBill: any) {
        console.log(kBill);
        this.connApi.safeGetFile(this.urlBill + '/' + kBill).subscribe(response => {
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Abrechnung').then(res => {
                if (!res) window.open(url);
            })
        }, error => {
            if (error.status) {
                this.toastNotFound();
            }
        });
    }

    // Toasts
    async toastNotFound() {
        const toast = await this.toastController.create({
            message: 'Abrechnung konnte nicht gefunden werden.',
            duration: 2500,
            cssClass: 'my-toast',
            position: 'bottom'
        });
        await toast.present();
    }

    getDate(date) {
        return this.datepipe.transform(date, 'dd.') + ' ' + this.getMonth(this.datepipe.transform(date, 'M'));
    }

    getMonth(month) {
        let lMonth: string[] = [];
        lMonth[1] = 'Januar';
        lMonth[2] = 'Februar';
        lMonth[3] = 'März';
        lMonth[4] = 'April';
        lMonth[5] = 'Mai';
        lMonth[6] = 'Juni';
        lMonth[7] = 'Juli';
        lMonth[8] = 'August';
        lMonth[9] = 'September';
        lMonth[10] = 'Oktober';
        lMonth[11] = 'November';
        lMonth[12] = 'Dezember';
        return lMonth[month];
    }

    onTotal() {
        this.connApi.safeGetFile(this.urlBill).subscribe(response => {
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            this.Alert.popUp('Abrechnung').then(res => {
                if (!res) window.open(url);
            })
        }, error => {
            console.log(error);
        });
    }
}
