import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DownloadPageRoutingModule } from './download-routing.module';
import { DownloadPage } from './download.page';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
let DownloadPageModule = class DownloadPageModule {
};
DownloadPageModule = __decorate([
    NgModule({
        imports: [
            CommonModule,
            FormsModule,
            IonicModule,
            DownloadPageRoutingModule,
            [MatTooltipModule],
            MatIconModule,
        ],
        declarations: [DownloadPage]
    })
], DownloadPageModule);
export { DownloadPageModule };
//# sourceMappingURL=download.module.js.map