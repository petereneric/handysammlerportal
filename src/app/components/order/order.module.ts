import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import {MatTooltipModule} from '@angular/material/tooltip';
import {OrderComponent} from './order.component';
import {IonicModule} from '@ionic/angular';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        IonicModule,
        MatIconModule,
    ],
    exports: [
        OrderComponent
    ],
    declarations: [OrderComponent]
})
export class LocationComponentModule {}
