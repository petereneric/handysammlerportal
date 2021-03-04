import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {AlertController} from '@ionic/angular';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {DataService} from '../../../../../services/data/data.service';

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    // Urls
    private urlOrdersAvailable = 'collector/order/available';
    private urlOrder = 'collector/order';

    // Variables
    public data;
    public oBox;
    public oBricolage;
    public boxAvailable;
    public bricolageAvailable;
    public flyerAvailable;
    public posterAvailable;
    public boxMax;
    public bricolageMax;
    public boxChoice = [0];
    public bricolageChoice = [0];
    public flyerChoice = [0];
    public posterChoice = [0];
    public boxOrder: number = 0;
    public bricolageOrder: number = 0;
    public flyerOrder: number = 0;
    public posterOrder: number = 0;

    public orderDisabled = false;
    public orderTaken = false;
    public spinner = false;

    public flyerSelected = false;
    public posterSelected = false;



    constructor(private connApi: ConnApiService, private alertController: AlertController, public router: Router, private dataService: DataService) {
    }

    ngOnInit() {
        this.available();


    }

    onOrder() {
        if (this.boxAvailable == 0 && this.bricolageAvailable == 0 && this.flyerAvailable == 0 && this.posterAvailable == 0) {
            this.dialogLimitReached();
            return;

        }
        if (this.boxOrder == 0 && this.bricolageOrder == 0 && this.flyerOrder == 0 && this.posterOrder == 0) {
            this.dialogNoOrders();
            return;
        }

        this.orderDisabled = true;
        this.spinner = true;
        let json = {
            'box': this.boxOrder,
            'bricolage': this.bricolageOrder,
            'flyer': this.flyerOrder,
            'poster': this.posterOrder
        };
        this.connApi.safePut(this.urlOrder, json).subscribe((data: HttpResponse<any>) => {
            if (data.status == 200) {
                console.log('Order added');
                this.dataService.publishData(null);
                (async () => {
                    this.orderTaken = true;
                    await new Promise( resolve => setTimeout(resolve, 2000));
                    this.spinner = false;
                    this.orderDisabled = false;

                })();


            }
        });

    }

    onChangedBoxOrder() {
        if (!this.flyerSelected && !this.posterSelected) {
            this.flyerOrder = (this.boxOrder*50 <= this.flyerAvailable) ? this.boxOrder*50 : this.flyerAvailable;
            this.posterOrder = this.boxOrder*5 <= this.posterAvailable ? this.boxOrder*5 : this.posterAvailable;
        }
    }

    onChangedBricolageOrder() {
        if (!this.flyerSelected && !this.posterSelected) {
            this.flyerOrder = this.bricolageOrder*50 <= this.flyerAvailable ? this.bricolageOrder*50 : this.flyerAvailable;
            this.posterOrder = this.bricolageOrder*5 <= this.posterAvailable ? this.bricolageOrder*5 : this.posterAvailable;
        }
    }

    onChangedFlyerOrder() {
        if (!this.flyerSelected) this.flyerSelected = true;
    }

    onChangedPosterOrder() {
        console.log("jo");
        if (!this.posterSelected) this.posterSelected = true;
    }

    // Dialogs
    async dialogLimitReached() {
        const alert = await this.alertController.create({
            header: 'Bestell-Limit erreicht',
            message: 'Leider hast Du Dein Bestell-Limit erreicht. Weitere Bestellungen sind nächstes Jahr wieder möglich!',
            cssClass: 'my-alert',
            buttons: ['Ok']
        });

        await alert.present();
    }

    async dialogNoOrders() {
        const alert = await this.alertController.create({
            header: 'Keine Bestellung ausgewählt',
            message: 'Bitte wähle deine Bestellung aus. Klicke dazu auf die jeweiligen Schaltflächen.',
            buttons: ['Ok']
        });

        await alert.present();
    }

    compare(c1, c2): boolean {
        return c1 == c2;
    }

    onClickPageInformation() {
        this.router.navigate(['collector/order/history']);
        this.boxChoice = [];
        this.bricolageChoice = [];
        this.flyerChoice = [];
        this.posterChoice = [];
        this.boxOrder = 0;
        this.bricolageOrder = 0;
        this.flyerOrder = 0;
        this.posterOrder = 0;
        this.orderDisabled = false;
        this.orderTaken = false;
        this.flyerSelected = false;
        this.posterSelected = false;
        this.available();
    }

    available() {
        this.connApi.safeGet(this.urlOrdersAvailable).subscribe((response: HttpResponse<any>) => {
            console.log(response.body);
            this.data = response.body;

            // Box
            this.oBox = this.data.oBox;
            if (this.oBox.bAvailable == 1) {
                this.oBox.maxOrder = Math.floor((+this.data.nLocations + (this.data.nDevices/this.data.intervallDevices) - this.oBox.nOrder));
                console.log(this.oBox.maxOrder);
                if (this.oBox.maxOrder > 0) {
                    for (var i = 1; i <= this.oBox.maxOrder && i < 5; i++) {
                        this.boxChoice.push(i);
                    }
                }
            }

            // Bricolage
            this.oBricolage = this.data.oBricolage;
            if (this.oBricolage.bAvailable == 1) {
                this.oBricolage.maxOrder = Math.floor((+this.data.nLocations + (this.data.nDevices/this.data.intervallDevices) - this.oBox.nOrder));
                console.log(this.oBricolage.maxOrder);
                if (this.oBricolage.maxOrder > 0) {
                    for (var i = 1; i <= this.oBricolage.maxOrder && i < 5; i++) {
                        this.bricolageChoice.push(i);
                    }
                }
                this.oBricolage.maxOrder = 0;
            }

            /*
                        // Bricolage
                        this.bricolageAvailable = data.body['bricolageAvailable'];
                        if (this.bricolageAvailable > 0) {
                            for (var i = 1; i <= this.bricolageAvailable; i++) {
                                this.bricolageChoice.push(i);
                            }
                        }

                        // Flyer
                        this.flyerAvailable = data.body['flyerAvailable'];
                        if (this.flyerAvailable > 0) {
                            for (var i = 50; i <= this.flyerAvailable; i += 50) {
                                this.flyerChoice.push(i);
                            }
                        }


                        // Poster
                        this.posterAvailable = data.body['posterAvailable'];
                        if (this.posterAvailable > 0) {
                            for (var i = 5; i <= this.posterAvailable; i += 5) {
                                this.posterChoice.push(i);
                            }
                        }

                        this.boxMax = data.body['boxMax'];
                        console.log(this.boxMax);
                        this.bricolageMax = data.body['bricolageMax'];
                        console.log(data.body);

                         */
        });
    }
}
