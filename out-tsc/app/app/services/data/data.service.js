import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
let DataService = class DataService {
    constructor() {
        this.roleSource = new BehaviorSubject(0);
        this.currentRole = this.roleSource.asObservable();
        this.dataSubject = new Subject();
    }
    changeRole(role) {
        this.roleSource.next(role);
    }
    publishData(data) {
        this.dataSubject.next(data);
    }
    getData() {
        return this.dataSubject;
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map