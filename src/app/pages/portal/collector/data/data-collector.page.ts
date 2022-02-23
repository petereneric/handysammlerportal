import {Component, OnInit} from '@angular/core';
import {MyPage} from '../../my-page';
import {Router} from '@angular/router';

@Component({
    selector: 'app-data-collector',
    templateUrl: './data-collector.page.html',
    styleUrls: ['./data-collector.page.scss'],
})
export class DataCollectorPage extends MyPage implements OnInit {

    constructor(public router: Router) {
        super(router);
    }

    ngOnInit() {
    }
}
