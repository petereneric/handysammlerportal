import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {ImpressumComponent} from "./impressum.component";
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [
        ImpressumComponent
    ],
    declarations: [ImpressumComponent]
})
export class ImpressumComponentModule {}
