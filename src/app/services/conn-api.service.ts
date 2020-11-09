import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type' : 'application/json'}),
  observe : 'response' as 'body'
}

@Injectable({
  providedIn: 'root'
})

export class ConnApiService {
  private urlApi:string = 'https://www.svp-api.com/api/public/index.php/'

  // Registration
  public static getCollectorTypes:string = 'registration/collection-types'
  public static postCollector:string = 'registration/collector'
  public static getPartnerRegistration:string = 'registration/partner'

  constructor(private http:HttpClient) { }

  getResponse(url:string) {
    return this.http.get<HttpResponse<any>>(`${this.urlApi}${url}`, httpOptions).toPromise();
  }

  post(url:string, json:any) {
    return this.http.post<HttpResponse<any>>(`${this.urlApi}${url}`, json, httpOptions).toPromise();
  }
}
