import {Component, OnInit} from '@angular/core';
import {ConnApiService} from '../../../../../services/conn-api/conn-api.service';
import {AlertController} from '@ionic/angular';
import {HttpResponse} from '@angular/common/http';
import {Router} from '@angular/router';

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
    private boxAvailable;
    private bricolageAvailable;
    private flyerAvailable;
    private posterAvailable;
    private boxMax;
    private bricolageMax;
    private boxChoice = [0];
    private bricolageChoice = [0];
    private flyerChoice = [0];
    private posterChoice = [0];
    private boxOrder: number = 0;
    private bricolageOrder: number = 0;
    private flyerOrder: number = 0;
    private posterOrder: number = 0;

    private orderDisabled = false;
    private orderTaken = false;
    private spinner = false;

    private flyerSelected = false;
    private posterSelected = false;



    constructor(private connApi: ConnApiService, private alertController: AlertController, public router: Router) {
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
        this.connApi.safeGet(this.urlOrdersAvailable).subscribe((data: HttpResponse<any>) => {
            // Box
            this.boxAvailable = data.body['boxAvailable'];
            if (this.boxAvailable > 0) {
                for (var i = 1; i <= this.boxAvailable; i++) {
                    this.boxChoice.push(i);
                }
            }

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
            this.bricolageMax = data.body['bricolageMax'];
            console.log(data.body);
        });
    }
}
