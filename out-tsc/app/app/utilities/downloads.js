import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let Downloads = class Downloads {
    constructor(Api) {
        this.Api = Api;
        // Urls
        this.urlInformationForCollector = 'download/document/informations_for_collector';
        this.urlBecomeCollector = 'download/document/become_collector';
    }
    informationForCollector() {
        this.Api.getFile(this.urlInformationForCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
    becomeCollector() {
        this.Api.getFile(this.urlBecomeCollector).subscribe(response => {
            console.log(response);
            let blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            window.open(url);
        });
    }
};
Downloads = __decorate([
    Injectable()
], Downloads);
export { Downloads };
//# sourceMappingURL=downloads.js.map