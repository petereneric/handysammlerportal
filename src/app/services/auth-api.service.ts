import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders( {
    'Content-Type' : 'application/json'}),
  observe : 'response' as 'body'
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  authUrl:string = 'https://www.svp-api.com/api/public/index.php/'
  tokenString:string = 'token/validation';
  urlLogin:string = 'login';
  urlRole:string = 'role';

  constructor(private http:HttpClient) { }

  login($role, $user, $password):Promise<HttpResponse<any>> {
    let json = {"role" : $role, "user" : $user, "password" : $password};
    return this.http.post<HttpResponse<any>>(`${this.authUrl}${this.urlLogin}`, json, httpOptions).toPromise();
  }

  isTokenValid():Promise<HttpResponse<any>> {
    var httpOptionsToken = {
      headers: new HttpHeaders( {
        'Content-Type' : 'application/json'}).set('Authorization',  `Bearer ${localStorage.getItem('token')}`),
      observe : 'response' as 'body'
    }
    var jsonToken = localStorage.getItem('token');
    console.log(jsonToken);
    console.log(localStorage.getItem('token'));
    return this.http.post<HttpResponse<any>>(`${this.authUrl}${this.tokenString}`, '{"role" = 0}', httpOptionsToken).toPromise();
  }

  getRole(token:string) {
    var httpOptionsToken = {
      headers: new HttpHeaders( {
        'Content-Type' : 'application/json'}).set('Authorization',  `Bearer ${localStorage.getItem('token')}`),
      observe : 'response' as 'body'
    }
    return this.http.post<HttpResponse<any>>(`${this.authUrl}${this.urlRole}`, '{"role" = 0}', httpOptionsToken).toPromise();
  }
}
