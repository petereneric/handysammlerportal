import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
let DataService = class DataService {
    constructor() {
        this.roleSource = new BehaviorSubject(0);
        this.currentRole = this.roleSource.asObservable();
        this.dataSubject = new Subject();
        this.locationSubject = new Subject();
    }
    changeRole(role) {
        this.roleSource.next(role);
    }
    // test
    publishData(data) {
        this.dataSubject.next(data);
    }
    getData() {
        return this.dataSubject;
    }
    callLocation(data) {
        this.locationSubject.next(data);
    }
    callbackLocation() {
        return this.locationSubject;
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map