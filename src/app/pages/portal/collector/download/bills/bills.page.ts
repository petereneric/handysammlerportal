import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {HttpResponse} from '@angular/common/http';
import {ToastController} from '@ionic/angular';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-bills',
    templateUrl: './bills.page.html',
    styleUrls: ['./bills.page.scss'],
    providers: [DatePipe]
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

    constructor(public datepipe: DatePipe, private connApi: ConnApiService, public toastController: ToastController) {
    }

    ngOnInit() {
        this.connApi.safeGet(this.urlYears).subscribe((response: HttpResponse<any>) => {
            console.log(response.body);
            this.lYears = response.body;
        }, error => {
            console.log(error);
        });
    }

    load() {
        this.connApi.safeGet(this.urlBills + this.cYear).subscribe((response: HttpResponse<any>) => {
            console.log(response.body);
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
        this.connApi.safeDownloadPDF(this.urlBill + '/' + kBill).subscribe(response => {
            console.log(response);
            console.log('he');

            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            /*
            // It is necessary to create a new blob object with mime-type explicitly set
            // otherwise only Chrome works like it should
            var newBlob = new Blob([response], { type: "application/pdf" });

            // IE doesn't allow using a blob object directly as link href
            // instead it is necessary to use msSaveOrOpenBlob
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob);
                return;
            }

            // For other browsers:
            // Create a link pointing to the ObjectURL containing the blob.
            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = "Je kar.pdf";
            // this is necessary as link.click() does not work on the latest firefox
            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                // For Firefox it is necessary to delay revoking the ObjectURL
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
            */


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
        this.connApi.safeDownloadPDF(this.urlBill).subscribe(response => {
            console.log(response);

            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        }, error => {

        });
    }
}
