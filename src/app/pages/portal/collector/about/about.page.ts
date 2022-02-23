import { Component, OnInit } from '@angular/core';
import {MyPage} from '../../my-page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage extends MyPage implements OnInit {

  constructor(public router: Router) {
    super(router);
  }

  ngOnInit() {
  }

}
