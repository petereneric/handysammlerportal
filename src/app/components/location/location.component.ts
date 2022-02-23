import {Component, NgModule, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Location} from '../../interfaces/location';
import {EventpingLocation} from '../../interfaces/eventpingLocation';


@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})

export class LocationComponent implements OnInit {

  // Input
  @Input() oLocation: Location;

  // Output
  @Output() ping: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {}

  onChangeActive() {
    this.oLocation.bActive = this.oLocation.bActive == 1 ? 0 : 1;
    const eventObject: EventpingLocation = {
      label: 'check',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }

  onEdit() {
    const eventObject: EventpingLocation = {
      label: 'edit',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }

  onDelete() {
    const eventObject: EventpingLocation = {
      label: 'delete',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }
}
