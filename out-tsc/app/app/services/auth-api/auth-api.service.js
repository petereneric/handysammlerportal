import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response'
};
let AuthApiService = class AuthApiService {
    constructor(http) {
        this.http = http;
        this.authUrl = 'https://www.svp-api.com/api/public/index.php/';
        this.tokenString = 'authenticate';
    }
    authenticate() {
        var httpOptionsToken = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        return this.http.post(`${this.authUrl}${this.tokenString}`, null, httpOptionsToken);
    }
};
AuthApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthApiService);
export { AuthApiService };
//# sourceMappingURL=auth-api.service.js.map