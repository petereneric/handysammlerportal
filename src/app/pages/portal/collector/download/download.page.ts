import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MyPage} from '../../my-page';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage extends MyPage implements OnInit {

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
