import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
let OrderPageModule = class OrderPageModule {
};
OrderPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            OrderPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [OrderPage]
    })
], OrderPageModule);
export { OrderPageModule };
//# sourceMappingURL=order.module.js.map