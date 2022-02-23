import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MyPage} from '../../my-page';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage extends MyPage implements OnInit {

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
