import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from "@angular/common/http";
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response'
};
let ConnApiService = class ConnApiService {
    constructor(http) {
        this.http = http;
        this.urlApi = 'https://www.svp-api.com/api/public/index.php/';
        this.urlServer = 'https://www.svp-api.com/';
    }
    get(url) {
        return this.http.get(`${this.urlApi}${url}`, httpOptions);
    }
    safeGet(url) {
        var httpOptionsToken = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        console.log(httpOptionsToken);
        return this.http.get(`${this.urlApi}${url}`, httpOptionsToken);
    }
    post(url, json) {
        console.log(url);
        return this.http.post(`${this.urlApi}${url}`, json, httpOptions);
    }
    safePost(url, json) {
        var httpOptionsToken = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        return this.http.post(`${this.urlApi}${url}`, json, httpOptionsToken);
    }
    safePut(url, json) {
        var httpOptionsToken = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        return this.http.put(`${this.urlApi}${url}`, json, httpOptionsToken);
    }
    safeUpload(url, data) {
        var httpOptionsToken = {
            headers: new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        return this.http.post(`${this.urlApi}${url}`, data, httpOptionsToken);
    }
    safeGetPDF(url) {
        return this.http.get(`${this.urlApi}${url}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            responseType: 'blob'
        });
    }
    getPDF(url) {
        return this.http.get(`${this.urlApi}${url}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'blob'
        });
    }
    safePostPDF(url, data) {
        return this.http.post(`${this.urlApi}${url}`, data, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            responseType: 'blob'
        });
    }
    safeDownload(url) {
        return this.http.get(`${this.urlApi}${url}`, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            responseType: 'blob'
        });
    }
    safeDelete(url) {
        var httpOptionsToken = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response'
        };
        return this.http.delete(`${this.urlApi}${url}`, httpOptionsToken);
    }
};
// Registration
ConnApiService.getCollectorTypes = 'registration/collection-types';
ConnApiService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ConnApiService);
export { ConnApiService };
//# sourceMappingURL=conn-api.service.js.map