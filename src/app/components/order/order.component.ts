import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from '../../interfaces/order';
import {EventpingOrder} from '../../interfaces/eventpingOrder';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  // Input
  @Input() oOrder: Order

  // Output
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  // Layout

  constructor() { }

  ngOnInit() {}

  getDate(date: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    return datepipe.transform(date, 'dd.MM.yyyy')
  }

  onDelete() {
    const eventObject: EventpingOrder = {
      label: 'delete',
      object: this.oOrder
    }
    this.ping.emit(eventObject)
  }

  onSearch() {
    console.log('jooo');
    window.open('https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode='+this.oOrder.kTracking, "_blank");
  }
}
