import {Component, NgModule, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {Location} from '../../interfaces/location';
import {Eventping} from '../../interfaces/eventping';

@NgModule({
  imports: [MatTooltipModule],
})

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
    const eventObject: Eventping = {
      label: 'check',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }

  onEdit() {
    const eventObject: Eventping = {
      label: 'edit',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }

  onDelete() {
    const eventObject: Eventping = {
      label: 'delete',
      object: this.oLocation
    }
    this.ping.emit(eventObject);
  }
}
