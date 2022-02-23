import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MyPage} from '../../my-page';

@Component({
  selector: 'app-send',
  templateUrl: './send.page.html',
  styleUrls: ['./send.page.scss'],
})
export class SendPage extends MyPage implements OnInit {

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
