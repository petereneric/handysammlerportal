import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private roleSource = new BehaviorSubject(0);
  currentRole = this.roleSource.asObservable();

  constructor() { }

  changeRole(role: number) {
    this.roleSource.next(role)
  }
}
