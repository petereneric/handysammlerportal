import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
let OrderComponent = class OrderComponent {
    // Layout
    constructor() {
        // Output
        this.ping = new EventEmitter();
    }
    ngOnInit() { }
    getDate(date) {
        const datepipe = new DatePipe('en-US');
        return datepipe.transform(date, 'dd.MM.yyyy');
    }
    onDelete() {
        const eventObject = {
            label: 'delete',
            object: this.oOrder
        };
        this.ping.emit(eventObject);
    }
    onSearch() {
        console.log('jooo');
        window.open('https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=' + this.oOrder.kTracking, "_blank");
    }
};
__decorate([
    Input()
], OrderComponent.prototype, "oOrder", void 0);
__decorate([
    Output()
], OrderComponent.prototype, "ping", void 0);
OrderComponent = __decorate([
    Component({
        selector: 'app-order',
        templateUrl: './order.component.html',
        styleUrls: ['./order.component.scss'],
    })
], OrderComponent);
export { OrderComponent };
//# sourceMappingURL=order.component.js.map