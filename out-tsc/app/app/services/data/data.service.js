import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
let DataService = class DataService {
    constructor() {
        this.roleSource = new BehaviorSubject(0);
        this.currentRole = this.roleSource.asObservable();
    }
    changeRole(role) {
        this.roleSource.next(role);
    }
};
DataService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map