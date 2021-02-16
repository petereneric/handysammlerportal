import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';


import {MatTooltipModule} from '@angular/material/tooltip';
import {LocationComponent} from './location.component';
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
        LocationComponent
    ],
    declarations: [LocationComponent]
})
export class LocationComponentModule {}
