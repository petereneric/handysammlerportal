import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from "./footer.component";
import {IonicModule} from '@ionic/angular';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        IonicModule,
    ],
    exports: [
        FooterComponent
    ],
    declarations: [FooterComponent]
})
export class FooterModule {}
