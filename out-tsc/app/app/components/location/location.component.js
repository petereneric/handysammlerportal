import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let LocationComponent = class LocationComponent {
    constructor() {
        // Output
        this.ping = new EventEmitter();
    }
    ngOnInit() { }
    onChangeActive() {
        this.oLocation.bActive = this.oLocation.bActive == 1 ? 0 : 1;
        const eventObject = {
            label: 'check',
            object: this.oLocation
        };
        this.ping.emit(eventObject);
    }
    onEdit() {
        const eventObject = {
            label: 'edit',
            object: this.oLocation
        };
        this.ping.emit(eventObject);
    }
    onDelete() {
        const eventObject = {
            label: 'delete',
            object: this.oLocation
        };
        this.ping.emit(eventObject);
    }
};
__decorate([
    Input()
], LocationComponent.prototype, "oLocation", void 0);
__decorate([
    Output()
], LocationComponent.prototype, "ping", void 0);
LocationComponent = __decorate([
    Component({
        selector: 'app-location',
        templateUrl: './location.component.html',
        styleUrls: ['./location.component.scss'],
    })
], LocationComponent);
export { LocationComponent };
//# sourceMappingURL=location.component.js.map