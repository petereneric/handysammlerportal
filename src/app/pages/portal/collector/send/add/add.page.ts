import {Component, OnInit} from '@angular/core';
import {ConnApiService} from "../../../../../services/conn-api/conn-api.service";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

    // Urls
    private urlOrdersAvailable = 'test';

    constructor(public connApi: ConnApiService) {
    }

    ngOnInit() {
    }


    onClickLithiumNotice() {
        // download Lithium-Notice

        this.connApi.safeDownload(this.urlOrdersAvailable).subscribe(response => {
            let blob: any = new Blob([response], {type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            window.open(url);
            //window.location.href = response.url;
            console.log(response);
            //fileSaver.saveAs(blob, 'employees.json');
        }), error => console.log('Error downloading the file'),
            () => console.info('File downloaded successfully');

    }

}
