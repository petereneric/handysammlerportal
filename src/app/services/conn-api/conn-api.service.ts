import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    observe: 'response' as 'body'
}

@Injectable({
    providedIn: 'root'
})

export class ConnApiService {
    private urlApi: string = 'https://www.svp-api.com/api/public/index.php/'

    // Registration
    public static getCollectorTypes: string = 'registration/collection-types'
    public static postCollector: string = 'registration/collector'
    public static getPartnerRegistration: string = 'registration/partner'
    public static postMailRegistration: string = "registration/mail"
    public static postMailResetPassword: string = "mail/reset-password"
    public static postLogin: string = "login"

    constructor(private http: HttpClient) {
    }

    get(url: string) {
        return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptions);
    }

    safeGet(url: string) {
        var httpOptionsToken = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response' as 'body'
        }
        return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptions);
    }

    post(url: string, json: any) {
        console.log(url);
        return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptions);
    }

    safePost(url: string, json: any) {
        var httpOptionsToken = {
            headers: new HttpHeaders({'Content-Type': 'application/json'}).set('Authorization', `Bearer ${localStorage.getItem('token')}`),
            observe: 'response' as 'body'
        }
        return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptionsToken);
    }


}