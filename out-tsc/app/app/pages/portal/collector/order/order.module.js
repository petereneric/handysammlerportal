import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrderPageRoutingModule } from './order-routing.module';
import { OrderPage } from './order.page';
let OrderPageModule = class OrderPageModule {
};
OrderPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            OrderPageRoutingModule
        ],
        declarations: [OrderPage]
    })
], OrderPageModule);
export { OrderPageModule };
//# sourceMappingURL=order.module.js.map