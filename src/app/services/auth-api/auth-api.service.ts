import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
}

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    authUrl: string = 'https://www.svp-api.com/api/public/index.php/'
    tokenString: string = 'authenticate';

    constructor(private http: HttpClient) {
    }

    authenticate() {
        var httpOptionsToken = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response' as 'body'
        }
        return this.http.post<HttpResponse<any>>(`${this.authUrl}${this.tokenString}`, null, httpOptionsToken);
    }
}
