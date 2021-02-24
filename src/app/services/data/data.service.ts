import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private roleSource = new BehaviorSubject(0);
  currentRole = this.roleSource.asObservable();

  private dataSubject = new Subject<any>();

  constructor() { }

  changeRole(role: number) {
    this.roleSource.next(role)
  }

  // test

  publishData(data: any) {
    this.dataSubject.next(data);
  }

  getData(): Subject<any> {
    return this.dataSubject;
  }
}
